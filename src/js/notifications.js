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
    text: 'No such country',
    delay: 2000,
  });
}

function myError() {
  defaultStack.close();
  error({
    title: 'Oh no',
    text: 'Something went wrong',
    delay: 10000,
  });
}

export default { onSuccess, notFound, myError };
