/*
 * frame - frame size to enter image {width: 256, height: 256}
 * given - image size {width: 2048, height: 2048}
*/
export function resize(frame, given) {
  let newSize = {};

  if (frame.width === frame.height) {

    if (given.width === given.height) {
      newSize = getNewSquareSizeByFrameHeight(frame.height);
    } else if (given.width > given.height) {
      newSize = getNewSizeByFrameWidth(frame.width, given);
    } else if (given.width < given.height) {
      newSize = getNewSizeByFrameHeight(frame.height, given);
    }

  } else if (frame.width > frame.height) {

    if (given.width === given.height) {
      newSize = getNewSquareSizeByFrameHeight(frame.height);
    } else if (given.width > given.height) {
      newSize = getNewSizeByAspectRatio(frame, given);
    } else if (given.width < given.height) {
      newSize = getNewSizeByFrameHeight(frame.height, given);
    }

  } else if (frame.width < frame.height) {

    if (given.width >= given.height) {
      newSize = getNewSizeByFrameWidth(frame.width, given);
    } else if (given.width < given.height) {
      newSize = getNewSizeByAspectRatio(frame, given);
    }

  }

  return newSize;
}

function getNewSquareSizeByFrameHeight(frameHeight) {
  const newSize = {};
  newSize.width = frameHeight;
  newSize.height = frameHeight;
  return newSize;
}

function getNewSizeByAspectRatio(frame, given) {
  let newSize = {};
  const frameRatio = frame.width / frame.height;
  const givenRatio = given.width / given.height;

  if (frameRatio <= givenRatio) { // given is more widely or same ratio => calc size through frame width
    newSize = getNewSizeByFrameWidth(frame.width, given);
  } else if (frameRatio > givenRatio) { // given is higer then frame => calc through frame height
    newSize = getNewSizeByFrameHeight(frame.height, given);
  }

  return newSize;
}

function getNewSizeByFrameWidth(frameWidth, given) {
  const newSize = {};
  const givenRatio = given.width / given.height;
  newSize.width = frameWidth;
  newSize.height = Math.round(given.height - (given.width - newSize.width) / givenRatio);
  return newSize;
}

function getNewSizeByFrameHeight(frameHeight, given) {
  const newSize = {};
  const givenRatio = given.width / given.height;
  newSize.height = frameHeight;
  newSize.width = Math.round(given.width - (given.height - newSize.height) * givenRatio);
  return newSize;
}
