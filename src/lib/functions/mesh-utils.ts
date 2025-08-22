import * as THREE from 'three';

/**
 * Finds all neighboring vertices for each vertex in a plane geometry.
 * @param geometry The THREE.PlaneGeometry to process.
 * @returns A Map where keys are vertex indices and values are arrays of neighbor indices.
 */
function findNeighbors(geometry: THREE.PlaneGeometry): Map<number, number[]> {
    const neighbors = new Map<number, number[]>();
    const index = geometry.getIndex();
    const position = geometry.getAttribute('position');

    if (!index) {
        // This logic is for non-indexed geometries, but PlaneGeometry is indexed.
        // A simple grid neighborhood finder would be more efficient for planes,
        // but this is a general approach for triangle meshes.
        console.warn('Geometry is not indexed. Neighbor finding may be slow or inaccurate.');
        return neighbors;
    }

    for (let i = 0; i < position.count; i++) {
        neighbors.set(i, []);
    }

    // Iterate through faces (triangles) to find shared vertices
    for (let i = 0; i < index.count; i += 3) {
        const vA = index.getX(i);
        const vB = index.getX(i + 1);
        const vC = index.getX(i + 2);

        // Add each vertex to the others' neighbor lists
        neighbors.get(vA)?.push(vB, vC);
        neighbors.get(vB)?.push(vA, vC);
        neighbors.get(vC)?.push(vA, vB);
    }
    
    // Remove duplicate neighbors
    for (let i = 0; i < position.count; i++) {
        const uniqueNeighbors = [...new Set(neighbors.get(i))];
        neighbors.set(i, uniqueNeighbors);
    }

    return neighbors;
}


/**
 * Applies Laplacian smoothing to a THREE.BufferGeometry.
 * @param geometry The geometry to smooth. The geometry is modified in place.
 * @param lambda The smoothing factor (0 to 1). Controls the intensity of the smoothing.
 * @param iterations The number of times to apply the smoothing algorithm.
 */
export function applyLaplacianSmoothing(geometry: THREE.BufferGeometry, lambda: number, iterations: number) {
    if (!(geometry instanceof THREE.PlaneGeometry)) {
        console.warn("Laplacian smoothing is best optimized for PlaneGeometry. Performance may vary.");
    }
    
    const positionAttribute = geometry.getAttribute('position') as THREE.BufferAttribute;
    const vertexCount = positionAttribute.count;

    // The neighbors map can be pre-calculated and cached for performance if the topology doesn't change.
    const neighbors = findNeighbors(geometry as THREE.PlaneGeometry);
    const tempPositions = new Float32Array(vertexCount * 3);

    for (let iter = 0; iter < iterations; iter++) {
        // Make a copy of current positions to calculate the new ones from a consistent state
        tempPositions.set(positionAttribute.array);

        for (let i = 0; i < vertexCount; i++) {
            const connectedVerts = neighbors.get(i);
            if (!connectedVerts || connectedVerts.length === 0) continue;

            const v_i = new THREE.Vector3().fromBufferAttribute(positionAttribute, i);
            const sum_vectors = new THREE.Vector3(0, 0, 0);

            for (const neighborIndex of connectedVerts) {
                const v_j = new THREE.Vector3().fromBufferAttribute(positionAttribute, neighborIndex);
                sum_vectors.add(v_j.sub(v_i)); 
                // Note: .sub() modifies v_j, so we re-fetch v_i in the next main loop iteration
            }
            
            // We only care about smoothing the height (y-axis)
            const laplace_y = sum_vectors.y / connectedVerts.length;
            const new_y = v_i.y + lambda * laplace_y;

            // Update the temporary array with the new Y position
            tempPositions[i * 3 + 1] = new_y;
        }

        // After calculating all new positions, update the actual geometry attribute
        positionAttribute.array.set(tempPositions);
    }

    positionAttribute.needsUpdate = true;
    geometry.computeVertexNormals();
}
