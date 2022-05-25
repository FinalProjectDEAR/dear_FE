export const memberIdCheck = (memberId) => {
  let _reg = /[A-za-z0-9]{3,10}/;

  return _reg.test(memberId);
};

export const nicknameCheck = (nickname) => {
  let _reg = /[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9]{3,10}/;

  return _reg.test(nickname);
};

export const pwdCheck = (pwd, memberId) => {
  if (!/[A-za-z0-9]{6,12}/.test(pwd)) {
    return false;
  } else if (pwd.search(memberId) > -1) {
    alert("비밀번호에 아이디가 포함되었습니다.");
    return false;
  }
  return true;
};
