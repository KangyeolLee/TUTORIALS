import Button from '@/components/Shared/Button';
import { Input } from '@/components/Shared/Input';
import Title from '@/components/Shared/Title';
import useInput from '@/hooks/useInput';
import {
  validateAll,
  validateEmail,
  validateName,
  validatePassword,
  validateRePassword,
} from '@/utils/constant/validate/validation';
import React, { useCallback, useState } from 'react';
import * as S from './styles';

const SignUp = () => {
  const [error, setError] = useState({
    email: false,
    password: false,
    rePassword: false,
    name: false,
    initialError: true,
  });

  const errorCheck = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      validateFunction: (param: string) => boolean
    ) => {
      const { name, value } = e.target;
      if (validateFunction(value)) {
        setError({ ...error, [name]: false });
      } else {
        setError({ ...error, [name]: true });
      }
    },
    [error]
  );

  const [password, , onChangePassword] = useInput('');

  const rePasswordCheck = useCallback(
    ({ target }: React.ChangeEvent<HTMLInputElement>) => {
      if (validateRePassword(target.value, password)) {
        setError({ ...error, rePassword: false });
      } else {
        setError({ ...error, rePassword: true });
      }
    },
    [password, error]
  );

  const formSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
      rePassword: { value: string };
      name: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;
    const rePassword = target.rePassword.value;
    const name = target.name.value;
    if (validateAll(email, password, rePassword, name)) {
      // TODO : 회원가입
    } else {
      window.alert('회원가입 폼이 제대로 채워져있는지 다시 한번 확인해보세요!');
    }
  }, []);

  return (
    <S.SignUpContainer>
      <Title level={2}>회원가입</Title>
      <S.FormContainer onSubmit={formSubmit}>
        <S.EmailContainer>
          <Input
            type="text"
            name="email"
            label="Outlined"
            labelName="이메일"
            placeholder="이메일을 입력해주세요."
            onBlur={(e) => errorCheck(e, validateEmail)}
            error={error.email}
            helperText="올바른 이메일 주소 형식이 아닙니다. ex) baemin@gmail.com"
          />
          <Button type="button" color="white">
            중복 확인
          </Button>
        </S.EmailContainer>
        <Input
          type="password"
          name="password"
          label="Outlined"
          labelName="비밀번호"
          value={password}
          onChange={onChangePassword}
          onBlur={(e) => errorCheck(e, validatePassword)}
          error={error.password}
          placeholder="비밀번호를 입력해주세요."
          helperText="10자 이상 영어 대문자, 소문자, 숫자, 특수문자 중 2종류를 조합해야합니다."
        />
        <Input
          type="password"
          name="rePassword"
          label="Outlined"
          onBlur={rePasswordCheck}
          error={error.rePassword}
          labelName="비밀번호 재입력"
          helperText="비밀번호가 일치하지 않거나 비밀번호를 입력해야 합니다."
          placeholder="비밀번호를 한번 더 입력해주세요."
        />
        <Input
          type="text"
          name="name"
          label="Outlined"
          onBlur={(e) => errorCheck(e, validateName)}
          error={error.name}
          labelName="이름"
          helperText="이름을 입력해주세요."
          placeholder="이름을 입력해주세요."
        />
        <Button type="submit" color="primary">
          회원가입
        </Button>
      </S.FormContainer>
    </S.SignUpContainer>
  );
};

export default SignUp;
