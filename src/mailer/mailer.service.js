const mailEventHanler = (event) => {
  console.log(event);
  throw new Error('SKJDLAKJSD');
};

export const initMailerService = ({ bus }) => {
  bus.on('mail', mailEventHanler);
  return {};
};
