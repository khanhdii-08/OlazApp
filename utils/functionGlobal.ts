export const getAcronym = (name: string) => {
  if (name) {
    const acronym = name
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "")
      .toUpperCase();

    return acronym.slice(0, 2);
  }
  return "";
};

export const getConversationByUserId = (
  userId: string,
  conversations: Array<any>
) => {
  console.log(userId);
  const conversation = conversations.find((e) => {
    return e.userId === userId && e.type === false;
  });

  conversations.forEach((element) => {
    console.log("test", element.userId);
    if (element.userId === userId) console.log(true);
  });

  return conversation;
};
