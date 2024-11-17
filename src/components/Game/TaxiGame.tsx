import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

// Main Phaser Scene
class MainScene extends Phaser.Scene {
    private player!: Phaser.GameObjects.Sprite;

    constructor() {
        super({ key: "MainScene" });
    }


    preload(): void {
        // Load assets
        this.load.image("taxi", "/assets/taxi.png");
        this.load.image("steering-wheel", "/assets/steering-wheel.png");
        this.load.image("car1", "/assets/car1.png");
        this.load.image("car2", "/assets/car2.png");
        this.load.image("car3", "/assets/car3.png");
        this.load.image("car4", "/assets/car4.png");
        this.load.image("tree1", "/assets/tree1.png");
        this.load.image("tree2", "/assets/tree2.png");
        this.load.image("tree3", "/assets/tree3.png");
        this.load.image("bush1", "/assets/bush1.png");
        this.load.image("bush2", "/assets/bush2.png");

        // Load spritesheet
        this.load.spritesheet("coin", "/assets/coin.gif", {
            frameWidth: 180, // Replace with your coin sprite's frame width
            frameHeight: 180, // Replace with your coin sprite's frame height
        });

        // Debug: Log asset loading
        this.load.on("filecomplete", (key: string) => {
            console.log(`Asset loaded: ${key}`);
        });

        this.load.on("loaderror", (file: any) => {
            console.error(`Failed to load file: ${file.src}`);
        });
    }

    create(): void {
        console.log("Game started!");

        // Add a background (green grass for now)
        const background = this.add.rectangle(400, 300, 800, 600, 0x2ecc71);
        background.setOrigin(0.5, 0.5);

        // Add the road (dark gray rectangle)
        const road = this.add.rectangle(400, 300, 300, 600, 0x34495e);
        road.setOrigin(0.5, 0.5);

        // Add the player (taxi sprite)
        this.player = this.add.sprite(400, 500, "taxi");
        this.player.setScale(0.5);
        this.player.setOrigin(0.5, 0.5);

        // Debug: Check asset positions
        console.log("Background position:", background.x, background.y);
        console.log("Road position:", road.x, road.y);
        console.log("Player position:", this.player.x, this.player.y);

        // Add other assets and log their positions
        const car1 = this.add.sprite(400, 400, "car1");
        console.log("Car1 position:", car1.x, car1.y);

        const tree1 = this.add.sprite(100, 100, "tree1");
        console.log("Tree1 position:", tree1.x, tree1.y);

        // Add more assets as needed and log their positions
    }

    update(): void {
        // Game updates here (currently empty for testing visuals)
    }
}

const GameCanvas: React.FC = () => {
    const gameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!gameRef.current) return;

        // Phaser configuration
        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: gameRef.current,
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { x:0, y: 0 },
                    debug: false,
                },
            },
            scene: MainScene,
            backgroundColor: "#87CEEB", // Light blue sky for background
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true); // Cleanup Phaser game instance
        };
    }, []);

    return (
        <div
            ref={gameRef}
            className="flex justify-center items-center bg-gray-800"
            style={{ width: "800px", height: "600px" }}
        />
    );
};

export default GameCanvas;
