"use client";
import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LoginWithGoogle from "@/components/LoginWithGoogle";
import Example from "./Example/Example";
import { Container } from "@/components/ui-library/container";
import { useRouter } from "next/navigation";

const HomeComponent = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <Container>
      <Banner />
      <Example />
      <LoginWithGoogle />
    </Container>
  );
};

export default HomeComponent;
