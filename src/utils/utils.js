
export const metersToLat = (meters) => {
    return meters / 110574;
  };

export const metersToLng = (meters, lat) => {
    return meters / (111320 * Math.cos((lat * Math.PI) / 180));
};

export const degreesToRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
};


export const nauticalMilesToMeters = (nm) => {
    return nm * 1852;
}

export const metersToNauticalMiles = (m) => {
    return m * 0.00053996;
}

// Function to calculation the angle rotation for point intersection with polar range
export const calculateIntersection = (center, range, angle) => {
    const intersectionPoint = [
      center[0] + metersToLat(range) * Math.cos(angle),
      center[1] + metersToLng(range, center[0]) * Math.sin(angle),
    ];

    return intersectionPoint;
};


/**
 * @param {max ring range} max 
 * @param {distance between two rings} step 
 * @returns [] - radius of rings in a descending order
 */
export const generateDescendingArray = (max, step) => {
    if (max < 0 || step <= 0) {
        console.error("Invalid parameters. Please provide non-negative values for max and a positive value for step.");
        return [];
      }
    
      const result = [];
      for (let i = max; i > 0; i -= step) {
        result.push(i);
      }
    
      return result;
}
