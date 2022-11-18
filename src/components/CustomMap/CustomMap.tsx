import React, { useState } from "react";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";

const CustomMap: React.FC<{
  activePoint: number;
  setActivePoint: any;
  anomalies: Array<any>;
}> = ({ activePoint, setActivePoint, anomalies }) => {
  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 10,
    controls: [],
  });
  const [isMapActive, setIsMapActive] = useState(true);

  const reloadMap = () => {
    setIsMapActive(false);
    setTimeout(() => setIsMapActive(true), 50);
  };

  return (
    <div>
      {isMapActive ? (
        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
          <Map
            height={window.innerHeight - 190 + "px"}
            width={"100%"}
            defaultState={mapState}
            modules={[
              "templateLayoutFactory",
              "option.presetStorage",
              "option.Manager",
              "control.ZoomControl",
              "control.FullscreenControl",
            ]}
          >
            <Clusterer
              options={{
                hasBalloon: true,
                hasHint: false,
              }}
            >
              {anomalies.map((point) => (
                <Placemark
                  key={point?.id}
                  geometry={[point.latitude, point.longitude]}
                  onClick={() => {
                    setActivePoint(point?.id);
                    setMapState({
                      center: [point.latitude, point.longitude],
                      zoom: 18,
                      controls: [],
                    });
                    reloadMap();
                  }}
                  properties={{
                    item: point.id,
                  }}
                  options={{
                    iconLayout: "default#image",
                    iconImageSize: [35, 35],
                    iconImageHref:
                      point?.id === activePoint
                        ? "https://ildan-dev.ru/placemarkRed.svg"
                        : "https://ildan-dev.ru/placemark.svg",
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomMap;
