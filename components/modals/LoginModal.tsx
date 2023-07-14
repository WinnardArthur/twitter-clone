import React, { useCallback, useEffect, useState } from "react";
import useLoginModal from "@/hooks/useLoginModal";
import Input from "../Input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import Button from "../Button";

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useGuestCredentials, setUseGuestCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const GUEST_USER_EMAIL = process.env.NEXT_PUBLIC_GUEST_USER_EMAIL as string;
  const GUEST_USER_PASSWORD = process.env
    .NEXT_PUBLIC_GUEST_USER_PASSWORD as string;

  const onToggle = useCallback(() => {
    if (isLoading) return;

    registerModal.onOpen();
    loginModal.onClose();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);
      if (useGuestCredentials) {
        if (email !== GUEST_USER_EMAIL && password !== GUEST_USER_PASSWORD) {
          return toast.error("Invalid Guest user credentials");
        }
      }

      await signIn("credentials", {
        email,
        password,
      });

      toast.success("Logged in successfully");
      loginModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setUseGuestCredentials(false);
    }
  }, [loginModal, email, password, GUEST_USER_EMAIL, GUEST_USER_PASSWORD]);

  useEffect(() => {
    if (useGuestCredentials) {
      onSubmit();
    }
  }, [useGuestCredentials]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      <Button
        label="Sign in as Guest user"
        disabled={isLoading}
        secondary
        onClick={() => {
          setUseGuestCredentials(true);
          setEmail(GUEST_USER_EMAIL);
          setPassword(GUEST_USER_PASSWORD);
        }}
      />
      <p className="mt-4">
        First time using Twitter?
        <span
          onClick={onToggle}
          className="text-white cursor-pointer hover:underline"
        >
          {" "}
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
