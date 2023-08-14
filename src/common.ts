const screenWidth = 640;
const screenHeight = 360;
export function scaleValue({
  currentScreen,
  desire = 0,
}: {
  currentScreen: {width: number; height: number};
  desire: number;
}) {
  if (desire === 0) {
    const scale = currentScreen.width / screenWidth;

    return scale;
  } else if (desire === 1) {
    const scale = currentScreen.height / screenHeight;

    return scale;
  }
  return 1;
}
