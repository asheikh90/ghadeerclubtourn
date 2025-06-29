import React, { useState } from 'react'
import { Upload, Camera, CheckCircle, AlertCircle, Loader, Gamepad2 } from 'lucide-react'
import Tesseract from 'tesseract.js'

const ScoreSubmission = ({ matches, updateMatchScore, games }) => {
  const [selectedMatch, setSelectedMatch] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)
  const [ocrResult, setOcrResult] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [manualScores, setManualScores] = useState({
    team1Score: '',
    team2Score: ''
  })
  const [submitStatus, setSubmitStatus] = useState(null)

  const pendingMatches = matches.filter(match => match.status === 'pending')
  const selectedMatchData = matches.find(match => match.id === selectedMatch)
  const selectedGame = selectedMatchData ? games.find(g => g.id === selectedMatchData.game) : null

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    setUploadedImage(file)
    setIsProcessing(true)
    setOcrResult(null)

    try {
      const result = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      })

      const text = result.data.text
      const numbers = text.match(/\d+/g) || []
      
      const potentialScores = numbers
        .map(num => parseInt(num))
        .filter(num => num >= 0 && num <= 50)
        .slice(0, 2)

      setOcrResult({
        text,
        extractedScores: potentialScores,
        confidence: result.data.confidence
      })

      if (potentialScores.length >= 2) {
        setManualScores({
          team1Score: potentialScores[0].toString(),
          team2Score: potentialScores[1].toString()
        })
      }
    } catch (error) {
      console.error('OCR Error:', error)
      setOcrResult({
        text: 'Error processing image',
        extractedScores: [],
        confidence: 0
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleSubmitScore = () => {
    if (!selectedMatchData || !manualScores.team1Score || !manualScores.team2Score) {
      return
    }

    const team1Score = parseInt(manualScores.team1Score)
    const team2Score = parseInt(manualScores.team2Score)
    
    const winner = team1Score > team2Score ? selectedMatchData.team1 : selectedMatchData.team2

    updateMatchScore(selectedMatch, team1Score, team2Score, winner)
    
    setSelectedMatch('')
    setUploadedImage(null)
    setOcrResult(null)
    setManualScores({ team1Score: '', team2Score: '' })
    setSubmitStatus('success')
    
    setTimeout(() => setSubmitStatus(null), 3000)
  }

  const groupMatchesByGame = () => {
    return pendingMatches.reduce((acc, match) => {
      if (!acc[match.game]) acc[match.game] = []
      acc[match.game].push(match)
      return acc
    }, {})
  }

  const matchesByGame = groupMatchesByGame()

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-gaming font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent mb-4">
          Submit Match Score
        </h2>
        <p className="text-slate-300 text-lg">
          Upload a screenshot and submit your match results
        </p>
      </div>

      {submitStatus === 'success' && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-green-900/50 border border-green-500/50 rounded-xl p-4 flex items-center space-x-3">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <span className="text-green-300 font-medium">Score submitted successfully!</span>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Match Selection & Image Upload */}
        <div className="space-y-6">
          <div className="card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <Gamepad2 className="h-6 w-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Select Match</h3>
            </div>
            
            {Object.keys(matchesByGame).length === 0 ? (
              <div className="text-center py-8">
                <AlertCircle className="h-12 w-12 text-slate-500 mx-auto mb-3" />
                <p className="text-slate-400">No pending matches available</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(matchesByGame).map(([gameId, gameMatches]) => {
                  const game = games.find(g => g.id === gameId)
                  return (
                    <div key={gameId}>
                      <h4 className="text-sm font-medium text-slate-400 mb-2 flex items-center space-x-2">
                        <span>{game?.name}</span>
                        <span className="game-badge">{gameMatches.length}</span>
                      </h4>
                      <select
                        value={selectedMatch}
                        onChange={(e) => setSelectedMatch(e.target.value)}
                        className="select-field"
                      >
                        <option value="">Choose a match...</option>
                        {gameMatches.map(match => (
                          <option key={match.id} value={match.id}>
                            {match.team1.teamName} vs {match.team2.teamName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="card-premium">
            <div className="flex items-center space-x-3 mb-6">
              <Camera className="h-6 w-6 text-primary-400" />
              <h3 className="text-xl font-bold text-white">Upload Screenshot</h3>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center hover:border-primary-500/50 transition-all duration-300">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={!selectedMatch}
                />
                <label
                  htmlFor="image-upload"
                  className={`cursor-pointer ${!selectedMatch ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                  <Camera className="h-12 w-12 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-300 font-medium">
                    Click to upload screenshot
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>

              {uploadedImage && (
                <div className="space-y-3">
                  <img
                    src={URL.createObjectURL(uploadedImage)}
                    alt="Uploaded screenshot"
                    className="w-full h-48 object-cover rounded-xl border border-slate-600/50"
                  />
                  
                  {isProcessing && (
                    <div className="flex items-center space-x-2 text-primary-400">
                      <Loader className="h-4 w-4 animate-spin" />
                      <span className="text-sm">Processing image with OCR...</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Score Input & OCR Results */}
        <div className="space-y-6">
          {selectedMatchData && (
            <div className="card-premium">
              <h3 className="text-xl font-bold text-white mb-4">Match Details</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <div className="text-white font-medium">{selectedMatchData.team1.teamName}</div>
                    <div className="text-xs text-slate-400">{selectedMatchData.team1.players?.[0]?.gamertag}</div>
                  </div>
                  <span className="game-badge">{selectedGame?.name}</span>
                </div>
                <div className="text-center text-slate-500 font-bold">VS</div>
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div>
                    <div className="text-white font-medium">{selectedMatchData.team2.teamName}</div>
                    <div className="text-xs text-slate-400">{selectedMatchData.team2.players?.[0]?.gamertag}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {ocrResult && (
            <div className="card-premium">
              <h3 className="text-xl font-bold text-white mb-4">OCR Results</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Confidence: {Math.round(ocrResult.confidence)}%
                  </label>
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary-600 to-primary-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${ocrResult.confidence}%` }}
                    ></div>
                  </div>
                </div>

                {ocrResult.extractedScores.length > 0 && (
                  <div>
                    <label className="block text-slate-300 text-sm mb-2">
                      Detected Scores:
                    </label>
                    <div className="flex space-x-2">
                      {ocrResult.extractedScores.map((score, index) => (
                        <span
                          key={index}
                          className="bg-primary-600/20 text-primary-300 px-3 py-1 rounded-lg border border-primary-500/30"
                        >
                          {score}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-slate-300 text-sm mb-2">
                    Extracted Text:
                  </label>
                  <div className="bg-slate-800/50 p-3 rounded-xl text-sm text-slate-300 max-h-32 overflow-y-auto border border-slate-700/50">
                    {ocrResult.text || 'No text detected'}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="card-premium">
            <h3 className="text-xl font-bold text-white mb-4">Enter Scores</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  {selectedMatchData?.team1.teamName || 'Team 1'} Score
                </label>
                <input
                  type="number"
                  value={manualScores.team1Score}
                  onChange={(e) => setManualScores(prev => ({
                    ...prev,
                    team1Score: e.target.value
                  }))}
                  className="input-field"
                  placeholder="Enter score"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-2">
                  {selectedMatchData?.team2.teamName || 'Team 2'} Score
                </label>
                <input
                  type="number"
                  value={manualScores.team2Score}
                  onChange={(e) => setManualScores(prev => ({
                    ...prev,
                    team2Score: e.target.value
                  }))}
                  className="input-field"
                  placeholder="Enter score"
                  min="0"
                />
              </div>

              <button
                onClick={handleSubmitScore}
                disabled={!selectedMatch || !manualScores.team1Score || !manualScores.team2Score}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  !selectedMatch || !manualScores.team1Score || !manualScores.team2Score
                    ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                Submit Score
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScoreSubmission
