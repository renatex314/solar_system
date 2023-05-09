import * as THREE from 'three';

class Planet {
    private orbitAngle: number;
    private orbitRadius: number;
    private angularSpeed: number;
    private meshObject: THREE.Object3D;

    constructor(
        initialAngle: number, 
        orbitRadius: number, 
        angularSpeed: number,
        radius: number,
        color: number
    ) {
        this.orbitAngle = initialAngle;
        this.orbitRadius = orbitRadius;
        this.angularSpeed = angularSpeed;
        this.initMeshObject(radius, color);
    }

    public addToScene(scene: THREE.Scene): void {
        scene.add(this.meshObject);
    }

    public update(): void {
        const newPosition: number[] = this.getPosition();

        this.meshObject.position.x = newPosition[0];
        this.meshObject.position.z = newPosition[1];
        
        this.orbitAngle += this.angularSpeed;
    }

    private getPosition(): number[] {
        return [
            this.orbitRadius * Math.cos(this.orbitAngle),
            this.orbitRadius * Math.sin(this.orbitAngle)
        ];
    }

    private initMeshObject(radius: number, color: number): void {
        let geometry: THREE.BufferGeometry = new THREE.SphereGeometry(radius);
        let material: THREE.Material = new THREE.MeshBasicMaterial({
            color: color
        });

        this.meshObject = new THREE.Mesh(geometry, material);
        this.update();
    }

}

export default Planet;