import { useState, useEffect, useCallback } from 'react';

export const useCity = (size) => {
  const [city, setCity] = useState({ size, data: [] });

  useEffect(() => {
    const data = [];
    for (let x = 0; x < size; x++) {
      const column = [];
      for (let y = 0; y < size; y++) {
        const tile = {
          x,
          y,
          building: undefined,
          update() {
            const rand = Math.random();
            if (rand < 0.01) {
              if (this.building === undefined) {
                this.building = 'building-1';
              } else if (this.building === 'building-1') {
                this.building = 'building-2';
              } else if (this.building === 'building-2') {
                this.building = 'building-3';
              }
            }
          }
        };
        column.push(tile);
      }
      data.push(column);
    }
    setCity({ size, data });
  }, [size]);

  // Update city data
  const updateCity = useCallback(() => {
    setCity((prevCity) => {
      const updatedData = prevCity.data.map((column) =>
        column.map((tile) => {
          tile.update();
          return tile;
        })
      );
      return { size: prevCity.size, data: updatedData };
    });
  }, []);

  return { ...city, updateCity };
};
