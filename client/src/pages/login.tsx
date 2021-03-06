import React from "react";
import toast from "react-hot-toast";
import * as yup from "yup";
import TextFieldForm from "../ui/TextFieldForm";
import { Formik, Form, Field } from "formik";
import { useUser } from "../context/UserState";
import Link from "next/link";
import { Card, Container } from "../ui";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Button } from '../ui';

const schema = yup.object({
	email: yup.string().required("Enter your username"),
	password: yup.string().required("Enter your password"),
});

interface FormValues {
	email: string,
	password: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	if (req.cookies.token) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		};
	}
	return {
		props: {}
	};
};

const Login = () => {
	const { loginUser } = useUser();
	const router = useRouter();

	const handleSubmit = async ({ email, password }: FormValues) => {
		try {
			const user = {
				email,
				password,
			};
			const res = await loginUser(user);
			toast.success(res.data.status.text);
			router.back();
		} catch (err) {
			toast.error(err.status.text);
		}
	};

	return (
		<Container>
			<Head>
				<title>crappit: Log in</title>
			</Head>
			<Card className="flex">
				<div className="bg-blue-300 w-32" />
				<div className="flex flex-col p-6 gap-2">
					<h4>Login</h4>
					<small>By continuing, you agree to our User Agreement and Privacy Policy.</small>
					<Formik
						initialValues={{ email: "", password: "" }}
						onSubmit={handleSubmit}
						validationSchema={schema}
					>
						{() => (
							<Form className="w-72 flex flex-col">
								<Field
									label="Email"
									name="email"
									type="email"
									component={TextFieldForm}
								/>
								<Field
									label="Password"
									name="password"
									type="password"
									component={TextFieldForm}
								/>
								<Button type="submit" className="mt-3" variant="filled">
									Login
								</Button>
							</Form>
						)}
					</Formik>
					<small className="flex gap-3 mt-3">
						<Link href="/forgot" passHref>
							<a>Forgot your password?</a>
						</Link>
						<Link href="/register" passHref>
							<a className="ml-auto">Sign up for an account!</a>
						</Link>
					</small>
				</div>
			</Card>
		</Container>
	);
};

export default Login;
