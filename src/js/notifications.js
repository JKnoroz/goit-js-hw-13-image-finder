import { notice, info, success, error, defaultStack } from '@pnotify/core';

function onSuccess() {
  defaultStack.close();
  success({
    title: 'WOW!',
    text: 'You found beautiful photos',
    delay: 1000,
  });
}

function notFound() {
  defaultStack.close();
  error({
    title: 'Ooops!',
    text: 'No pictures found! Try another request',
    delay: 2000,
  });
}

function myError() {
  defaultStack.close();
  error({
    title: 'Oh no',
    text: 'Something went wrong',
    delay: 5000,
  });
}

export default { onSuccess, notFound, myError };
