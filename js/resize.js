/*
 * frame - frame size to enter image {width: 256, height: 256}
 * given - image size {width: 2048, height: 2048}
*/
export const resize = (frame, given) => {
  let newSize = null;

  if (frame.width === frame.height) {

    if (given.width === given.height) {
      newSize = getNewSquareSizeByFrameHeight(frame.height);
    } else if (given.width > given.height) {
      newSize = getNewSizeByFrameWidth(frame.width, given);
    } else {
      newSize = getNewSizeByFrameHeight(frame.height, given);
    }

  } else if (frame.width > frame.height) {

    if (given.width === given.height) {
      newSize = getNewSquareSizeByFrameHeight(frame.height);
    } else if (given.width > given.height) {
      newSize = getNewSizeByAspectRatio(frame, given);
    } else {
      newSize = getNewSizeByFrameHeight(frame.height, given);
    }

  } else {

    if (given.width >= given.height) {
      newSize = getNewSizeByFrameWidth(frame.width, given);
    } else {
      newSize = getNewSizeByAspectRatio(frame, given);
    }

  }

  return newSize;
};

const getNewSquareSizeByFrameHeight = (frameHeight) => ({width: frameHeight, height: frameHeight});

const getNewSizeByAspectRatio = (frame, given) => {
  const frameRatio = frame.width / frame.height;
  const givenRatio = given.width / given.height;
  let newSize = null;

  if (frameRatio <= givenRatio) { // given is more widely or same ratio => calc size through frame width
    newSize = getNewSizeByFrameWidth(frame.width, given);
  } else { // given is higer then frame => calc through frame height
    newSize = getNewSizeByFrameHeight(frame.height, given);
  }

  return newSize;
};

const getNewSizeByFrameWidth = (frameWidth, given) => {
  const givenRatio = given.width / given.height;
  const height = Math.round(given.height - (given.width - frameWidth) / givenRatio);
  return {width: frameWidth, height};
};

const getNewSizeByFrameHeight = (frameHeight, given) => {
  const givenRatio = given.width / given.height;
  const width = Math.round(given.width - (given.height - frameHeight) * givenRatio);
  return {width, height: frameHeight};
};
