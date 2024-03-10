"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { Separator } from "@/components/ui/separator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useRouter();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const googleLogIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };
  const handleLoginGoogle = () => {
    try {
      googleLogIn();
    } catch (error) {
      console.log(error);
    }
  };

  const HandleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userCresidential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCresidential.user);
      const user = userCresidential.user;

      navigate.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    //setTextError("");
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    // setTextError("");
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(` urerr: ${user}`);
      if (user != null) {
        router.replace("/dashboard");
        console.log(currentUser?.displayName);
      }
    });
    return () => unsubscribe();
  }, [user]);
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Card className="max-w-sm  mx-auto shadow-md ">
        <br />
        <br />
        <p className="ml-10 font-bold">Welcome back</p>
        <form onSubmit={HandleSubmit}>
          <div className="mx-10">
            <br />
            <div className="mb-5">
              <Label htmlFor="email">Your email address</Label>

              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleChangeEmail}
                required
              />
            </div>
            <div className="mb-5">
              <Label htmlFor="password">Your password</Label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={handleChangePassword}
                required
              />
            </div>
            <div className="flex items-center space-x-2 mb-5">
              <Checkbox id="terms" />
              <Label htmlFor="terms">Accept terms and conditions</Label>
            </div>
            <Button
              type="submit"
              className="bg-emerald-700 hover:bg-emerald-800"
            >
              Login
            </Button>
          </div>
        </form>
        <Separator className="my-2" />
        <div className="ml-10 mt-5">
          <Button onClick={handleLoginGoogle}>Login with Google</Button>
        </div>
        <br />
        <br />
        <br />
      </Card>
      <br />
      <br />
    </>
  );
}
