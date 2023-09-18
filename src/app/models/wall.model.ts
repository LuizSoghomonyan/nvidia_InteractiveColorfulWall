export interface WallModel {
    width: number;
    height: number;
    colorCount: number;
    changeColorsDiagonally: boolean;
}

export function getEmptyWallModel(): WallModel{
  return {
    width: 0,
    height: 0,
    colorCount: 0,
    changeColorsDiagonally: false
  }
}
