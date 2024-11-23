// src/components/Game.tsx
import React, { useEffect, useRef, useState } from 'react'
import Phaser from 'phaser'
import TopLeft from './TopLeft'
import TopRight from './TopRight'
import Leaderboard from './Leaderboard'
import InfoModal from './InfoModal'
import GameControls from './GameControls'
import { useLives } from '../../utils/useLives'
import { getLeaderboard, updateLeaderboard } from '../../utils/api'
import LeaderboardIcon from '../../assets/leaderboard-mini.svg'

interface LeaderboardEntry {
  walletAddress: string
  kmDriven: number
  coinsEarned: number
  expPoints: number
}

interface GameProps {
  walletAddress: string
}

const Game: React.FC<GameProps> = ({ walletAddress }) => {
  const gameRef = useRef<HTMLDivElement>(null)
  const [gameOver, setGameOver] = useState(false)
  const [kmDriven, setKmDriven] = useState(0)
  const [coinsEarned, setCoinsEarned] = useState(0)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [moveDirection, setMoveDirection] = useState<'left' | 'right' | null>(
    null,
  ) // For touch controls

  const { lives, remainingTime, decrementLife, canPlay } = useLives(
    walletAddress,
  )

  useEffect(() => {
    if (!canPlay) return

    // Phaser game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameRef.current || undefined,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    }

    const game = new Phaser.Game(config)

    // Preload assets and sounds
    function preload(this: Phaser.Scene) {
      this.load.image('road', '/assets/road.png')
      this.load.image('taxi', '/assets/taxi.png')
      this.load.image('car1', '/assets/car1.png')
      this.load.image('car2', '/assets/car2.png')
      this.load.image('coin', '/assets/coin.gif')
      this.load.image('tree1', '/assets/tree1.png')
      this.load.image('tree2', '/assets/tree2.png')
      //todo:
      //this.load.audio('coinSound', '/assets/coin.wav')
      //this.load.audio('collisionSound', '/assets/collision.wav')
    }

    let taxi: Phaser.Physics.Arcade.Sprite // Taxi sprite
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys | null // Keyboard controls
    let coins: Phaser.Physics.Arcade.Group // Group for coins
    let cars: Phaser.Physics.Arcade.Group // Group for cars
    let kmInterval: Phaser.Time.TimerEvent // Timer for km driven

    // Create game objects
    function create(this: Phaser.Scene) {
      this.add.image(400, 300, 'road') // Add road background
      taxi = this.physics.add.sprite(400, 500, 'taxi') // Add taxi sprite
      taxi.setCollideWorldBounds(true) // Prevent taxi from moving out of bounds

      // Initialize keyboard controls if available
      cursors = this.input.keyboard
        ? this.input.keyboard.createCursorKeys()
        : null

      coins = this.physics.add.group() // Initialize coins group
      cars = this.physics.add.group() // Initialize cars group

      // Collision detection between taxi and coins
      this.physics.add.overlap(taxi, coins, collectCoin, undefined, this)
      // Collision detection between taxi and cars
      this.physics.add.collider(taxi, cars, hitCar, undefined, this)

      // Timer to increment kmDriven every second
      kmInterval = this.time.addEvent({
        delay: 1000, // 1 second
        callback: () => {
          setKmDriven((prev) => prev + 1)
        },
        loop: true,
      })

      // Spawn coins at random intervals between 10-15 seconds
      this.time.addEvent({
        delay: Phaser.Math.Between(10000, 15000),
        callback: spawnCoin,
        callbackScope: this,
        loop: true,
      })

      // Spawn cars every 5 seconds
      this.time.addEvent({
        delay: 5000,
        callback: spawnCar,
        callbackScope: this,
        loop: true,
      })
    }

    // Update loop for handling controls
    function update(this: Phaser.Scene) {
      // Handle keyboard controls
      if (cursors) {
        if (cursors.left.isDown) {
          taxi.setVelocityX(-200)
        } else if (cursors.right.isDown) {
          taxi.setVelocityX(200)
        } else {
          taxi.setVelocityX(0)
        }
      }

      // Handle touch controls
      if (moveDirection === 'left') {
        taxi.setVelocityX(-200)
      } else if (moveDirection === 'right') {
        taxi.setVelocityX(200)
      } else {
        taxi.setVelocityX(0)
      }
    }

    /**
     * Callback when the taxi collects a coin.
     * Destroys the coin, increments coinsEarned, and plays a sound.
     */
    function collectCoin(
      this: Phaser.Scene,
      taxiObj: Phaser.GameObjects.GameObject,
      coin: Phaser.GameObjects.GameObject,
    ) {
      ;(coin as Phaser.Physics.Arcade.Sprite).destroy()
      setCoinsEarned((prev) => prev + 1)
      // todo: this.sound.play('coinSound') // Play coin collection sound
    }

    /**
     * Callback when the taxi collides with another car.
     * Pauses the game, tints the taxi, sets game over state, plays a sound, decrements life, and updates the leaderboard.
     */
    function hitCar(
      this: Phaser.Scene,
      taxiObj: Phaser.GameObjects.GameObject,
      car: Phaser.GameObjects.GameObject,
    ) {
      this.physics.pause()
      ;(taxi as Phaser.Physics.Arcade.Sprite).setTint(0xff0000) // Tint taxi red
      setGameOver(true)
      // todo: this.sound.play('collisionSound') // Play collision sound
      decrementLife()
      updateLeaderboardData()
    }

    /**
     * Spawns a coin at a random x position at the top of the screen.
     * The coin moves downward at a constant velocity.
     */
    function spawnCoin(this: Phaser.Scene) {
      const x = Phaser.Math.Between(50, 750)
      const y = 0
      const coin = coins.create(x, y, 'coin') as Phaser.Physics.Arcade.Sprite
      coin.setVelocityY(100)
    }

    /**
     * Spawns a car at a random x position at the top of the screen.
     * The car moves downward at a constant velocity.
     */
    function spawnCar(this: Phaser.Scene) {
      const x = Phaser.Math.Between(50, 750)
      const y = 0
      const carType = Phaser.Math.RND.pick(['car1', 'car2']) as string
      const car = cars.create(x, y, carType) as Phaser.Physics.Arcade.Sprite
      car.setVelocityY(150)
    }

    /**
     * Updates the leaderboard with the current game's results.
     * Calculates experience points and sends data to the backend.
     */
    function updateLeaderboardData() {
      const expPoints = kmDriven + coinsEarned * 10
      updateLeaderboard(walletAddress, kmDriven, coinsEarned, expPoints)
        .then(() => fetchLeaderboard())
        .catch((error) => {
          console.error('Failed to update leaderboard:', error)
        })
    }

    /**
     * Fetches the latest leaderboard data from the backend.
     */
    function fetchLeaderboard() {
      getLeaderboard()
        .then((data) => setLeaderboardData(data))
        .catch((error) => {
          console.error('Failed to fetch leaderboard:', error)
        })
    }

    // Cleanup Phaser game instance on component unmount
    return () => {
      game.destroy(true)
    }
  }, [
    canPlay,
    walletAddress,
    decrementLife,
    kmDriven,
    coinsEarned,
    moveDirection,
  ]) // Dependencies for useEffect

  // Show the leaderboard modal
  const handleShowLeaderboard = () => {
    getLeaderboard()
      .then((data) => setLeaderboardData(data))
      .catch((error) => {
        console.error('Failed to fetch leaderboard:', error)
      })
    setShowLeaderboard(true)
  }

  // Close the leaderboard modal
  const handleCloseLeaderboard = () => {
    setShowLeaderboard(false)
  }

  // Handle moving left (touch or mouse)
  const handleMoveLeft = () => {
    setMoveDirection('left')
  }

  // Handle moving right (touch or mouse)
  const handleMoveRight = () => {
    setMoveDirection('right')
  }

  // Handle stopping movement (touch or mouse)
  const handleMoveStop = () => {
    setMoveDirection(null)
  }

  return (
    <div className="relative w-full h-full">
      {/* Top-left UI showing wallet address, km driven, and coins earned */}
      <TopLeft
        walletAddress={walletAddress}
        kmDriven={kmDriven}
        coinsEarned={coinsEarned}
      />

      {/* Top-right UI showing lives and remaining time if lives are exhausted */}
      <TopRight lives={lives} remainingTime={remainingTime} />

      {/* Phaser game canvas */}
      <div ref={gameRef} className="w-full h-full"></div>

      {/* Game over modal */}
      {gameOver && (
        <InfoModal
          kmDriven={kmDriven}
          coinsEarned={coinsEarned}
          onClose={() => setGameOver(false)}
        />
      )}

      {/* Leaderboard button with SVG icon */}
      <button
        className="absolute top-4 right-16 p-2 bg-gray-800 text-white rounded"
        onClick={handleShowLeaderboard}
      >
        <img src={LeaderboardIcon} alt="Coin" className="w-6 h-6 mr-1" />{' '}
        {/* Using SVG as React component */}
      </button>

      {/* Leaderboard modal */}
      {showLeaderboard && (
        <Leaderboard data={leaderboardData} onClose={handleCloseLeaderboard} />
      )}

      {/* On-screen touch controls for mobile */}
      <GameControls
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onMoveStop={handleMoveStop} // Pass handleMoveStop to stop movement
      />
    </div>
  )
}

export default Game
