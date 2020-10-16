import React, { useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL,
	VALIDATOR_MAXLENGTH,
} from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';

import './Auth.css';

const Auth = () => {
	const auth = useContext(AuthContext);
	const [isLoginMode, setIsLoginMode] = useState(true);
	const [message, setMessage] = useState('');
	const { isLoading, error, sendRequest } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			name: {
				value: '',
				isValid: false,
			},
			password: {
				value: '',
				isValid: false,
			},
		},
		false
	);

	const authSubmitHandler = async (event) => {
		event.preventDefault();
		setMessage('');

		if (isLoginMode) {
			try {
				const resData = await sendRequest(
					`${process.env.REACT_APP_API_URL}/user/authenticate`,
					'POST',
					JSON.stringify({
						name: formState.inputs.name.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);

				auth.login(resData.user, resData.token);
				return <Redirect to="/" />;
			} catch (err) {
				console.log(err);
			}
		} else {
			if (formState.inputs.password.value !== formState.inputs.confirm.value) {
				setMessage('Confirm password does not match');
				return;
			}
			try {
				const resData = await sendRequest(
					`${process.env.REACT_APP_API_URL}/user/register`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						name: formState.inputs.name.value,
						password: formState.inputs.password.value,
					}),
					{
						'Content-Type': 'application/json',
					}
				);

				auth.login(resData.user, resData.token);
				return <Redirect to="/" />;
			} catch (err) {
				console.log(err);
			}
		}
	};

	const switchModeHandler = () => {
		// Register -> Login mode
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					email: undefined,
					confirm: undefined,
				},
				formState.inputs.name.isValid && formState.inputs.password.isValid
			);
		} else {
			// Login -> Register mode
			setFormData(
				{
					...formState.inputs,
					email: {
						value: '',
						isValid: false,
					},
					confirm: {
						value: '',
						isValid: false,
					},
				},
				false
			);
		}
		setIsLoginMode((prev) => !prev);
	};

	return (
		<>
			<Helmet>
				<title>{'Bloggit - Authenticate'}</title>
			</Helmet>
			<Card className="authentication card--lighter">
				{isLoading && <LoadingSpinner asOverlay />}
				<h2>Authenticate</h2>
				<hr />
				<form onSubmit={authSubmitHandler}>
					{!isLoginMode && (
						<Input
							element="input"
							id="email"
							type="email"
							label="E-mail"
							validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
							errorText="You must enter a valid email"
							onInput={inputHandler}
						/>
					)}
					<Input
						element="input"
						id="name"
						type="text"
						label="Name"
						validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
						errorText="Username must be more than 3 characters"
						onInput={inputHandler}
					/>
					<Input
						element="input"
						id="password"
						type="password"
						label="Password"
						validators={[
							VALIDATOR_REQUIRE(),
							VALIDATOR_MINLENGTH(8),
							VALIDATOR_MAXLENGTH(25),
						]}
						errorText="Password must be between 8-25 characters"
						onInput={inputHandler}
					/>
					{!isLoginMode && (
						<Input
							element="input"
							id="confirm"
							type="password"
							label="Confirm Password"
							validators={[
								VALIDATOR_REQUIRE(),
								VALIDATOR_MINLENGTH(8),
								VALIDATOR_MAXLENGTH(25),
							]}
							errorText="You must re-enter Password"
							onInput={inputHandler}
						/>
					)}
					<p>{error}</p>
					<p>{message}</p>
					<Button type="submit" disabled={!formState.isValid}>
						{isLoginMode ? 'LOGIN' : 'REGISTER'}
					</Button>
				</form>
				<Button inverse onClick={switchModeHandler}>
					{isLoginMode ? 'REGISTER' : 'LOGIN'}
				</Button>
			</Card>
		</>
	);
};

export default Auth;
