import React, { useEffect } from 'react'
import Phaser from 'phaser'
import loadScript from './loadScript'

class TaxiGame extends Phaser.Scene {
  backgroundLayer!: Phaser.GameObjects.Layer
  roadLayer!: Phaser.GameObjects.Layer
  bushLayer!: Phaser.GameObjects.Layer
  coinLayer!: Phaser.GameObjects.Layer
  trafficLayer!: Phaser.GameObjects.Layer
  carLayer!: Phaser.GameObjects.Layer
  treeLayer!: Phaser.GameObjects.Layer
  UILayer!: Phaser.GameObjects.Layer

  constructor() {
    super({ key: 'TaxiGame' })
  }

  preload() {
    // Load all necessary assets
    this.load.image('background', 'assets/background.png')
    this.load.image('road', 'assets/road.png')
    this.load.image('bush', 'assets/bush.png')
    this.load.image('coin', 'assets/coin.png')
    this.load.image('traffic', 'assets/traffic.png')
    this.load.image('car', 'assets/car.png')
    this.load.image('tree', 'assets/tree.png')
    // Add more assets as needed
  }

  create() {
    // Create depth layers
    this.backgroundLayer = this.add.layer()
    this.roadLayer = this.add.layer()
    this.bushLayer = this.add.layer()
    this.coinLayer = this.add.layer()
    this.trafficLayer = this.add.layer()
    this.carLayer = this.add.layer()
    this.treeLayer = this.add.layer()
    this.UILayer = this.add.layer()

    // Set layer depths
    this.backgroundLayer.setDepth(0)
    this.roadLayer.setDepth(1)
    this.bushLayer.setDepth(2)
    this.coinLayer.setDepth(2.5)
    this.trafficLayer.setDepth(3)
    this.carLayer.setDepth(4)
    this.treeLayer.setDepth(5)

    // Add game objects to layers
    this.backgroundLayer.add(this.add.image(0, 0, 'background').setOrigin(0, 0))
    this.roadLayer.add(this.add.image(0, 0, 'road').setOrigin(0, 0))
    this.bushLayer.add(this.add.image(0, 0, 'bush').setOrigin(0, 0))
    this.coinLayer.add(this.add.image(0, 0, 'coin').setOrigin(0, 0))
    this.trafficLayer.add(this.add.image(0, 0, 'traffic').setOrigin(0, 0))
    this.carLayer.add(this.add.image(0, 0, 'car').setOrigin(0, 0))
    this.treeLayer.add(this.add.image(0, 0, 'tree').setOrigin(0, 0))
    // Add more game objects as needed

    // Start the game logic
    this.startGame()
  }

  startGame() {
    // Implement game start logic here
  }
}

// React component to render the game
const GameComponent: React.FC = () => {
  useEffect(() => {
    const loadGameScripts = async () => {
      try {
        await loadScript(
          'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
        )
        // Add any other game-related scripts here

        // Initialize Phaser game
        const config = {
          type: Phaser.AUTO,
          width: 800,
          height: 600,
          scene: TaxiGame,
        }
        new Phaser.Game(config)
      } catch (error) {
        console.error(error)
      }
    }

    loadGameScripts()
  }, [])

  return (
    <div>
      <div id="game-container"></div>
    </div>
  )
}

export default GameComponent
