import React, { useState, useContext, createContext, useEffect } from "react";
import { auth, app } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const AuthContext = React.createContext<User | null>(null);
