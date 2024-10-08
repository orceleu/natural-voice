"use client";
import React, { JSXElementConstructor, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { auth } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import axios from "axios";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setTextError] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log(` urerr: ${user}`);
      if (user != null) {
        router.push("/dashboard");
        console.log(currentUser?.displayName);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleSignInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ app: "natural-voice" });
    try {
      await signInWithPopup(auth, provider);
      // createCustomerId(email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log({ res });
      setEmail("");
      setPassword("");
      // createCustomerId(email);

      toast({
        title: "Account created",
      });
      router.replace("/dashboard");
    } catch (error) {
      setTextError("your password length must be up 6 ");
      console.error(error);
    }
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setTextError("");
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setTextError("");
  };
  return (
    <>
      <div>
        <br />
        <br />
        <br />
        <br />
        <Card className="max-w-sm  mx-auto shadow-md ">
          <br />
          <br />
          <p className="ml-9 font-bold">Create your account</p>
          <p className="ml-9 mt-5 text-sm text-red-800">{errorText}</p>
          <form onSubmit={handleSignUp}>
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
                className="bg-emerald-700 hover:bg-emerald-800"
                type="submit"
              >
                Register
              </Button>
            </div>
          </form>
          <Separator className="my-2" />
          <div className=" ml-10 mt-5">
            <Button onClick={handleSignInGoogle}>sign up with Google</Button>
          </div>
          <br />
          <p className="text-center">
            Already have account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-emerald-500"
            >
              Login
            </span>
          </p>
          <br />
          <br />
        </Card>
        <br />
        <br />
      </div>
    </>
  );
}
