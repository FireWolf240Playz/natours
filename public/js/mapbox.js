export const displayMap = (locations) => {
  window.scrollTo(0, 0);

  mapboxgl.accessToken =
    "pk.eyJ1IjoiZmlyZXdvbGYyNDBwbGF5eiIsImEiOiJjbTNoNmN3YmswY2I4MmhxemJyZWp2bDczIn0.KpPXEAsEgvD7ecHzwomU2g";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/firewolf240playz/cm3h7dbr9005701s966f7glcq",
    scrollZoom: false,
    interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  // Coordinates array for the route line
  const coordinates = [];

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Add coordinates to the array
    coordinates.push(loc.coordinates);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  // Fit the map bounds to include all locations
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
    animate: false,
  });

  // Add a route line layer
  map.on("load", () => {
    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: coordinates, // Use the collected coordinates
        },
      },
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#5FC879",
        "line-width": 4,
      },
    });
  });
};
