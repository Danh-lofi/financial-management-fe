const MErrorList = ({ messageList, columns }: any) => {
  const convertNameMessage = (message = '') => {
    const listKeyMessage = message.split(' ');
    const itemTextMessage = columns.find((item: any) => item.key === listKeyMessage[0]);
    if (itemTextMessage) {
      listKeyMessage.shift();
      return `${itemTextMessage.name} ${listKeyMessage.join(' ')}`;
    }
    return message;
  };
  return (
    <ul style={{ paddingInlineStart: '20px !important' }}>
      {messageList.map((item: any, index: number) => (
        <li key={index}>{convertNameMessage(item)}</li>
      ))}
    </ul>
  );
};

export default MErrorList;
