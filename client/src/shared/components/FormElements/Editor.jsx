import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Input from '../../../shared/components/FormElements/Input';
import BlogPreview from '../../../blog/components/BlogPreview';

import './Editor.css';
import '../../../blog/pages/BlogForm.css';

const blogPreviewStyle = {
	width: '100%',
	margin: 0,
};

const previewContentStyle = {
	height: '70vh',
	borderRadius: 0,
	overflowY: 'scroll',
};

const Editor = (props) => {
	return (
		<Tabs forceRenderTabPanel={true}>
			<TabList>
				<Tab>
					<p className="blog-form__label">Content</p>
				</Tab>
				<Tab>
					<p className="blog-form__label">Preview</p>
				</Tab>
			</TabList>
			<TabPanel>
				<Input
					id={props.id}
					element="textarea"
					validators={props.validators}
					errorText={props.errorText}
					onInput={props.onInput}
					initialValue={props.editValue}
					initialValid={props.editValid}
				/>
			</TabPanel>
			<TabPanel>
				<BlogPreview
					text={props.previewValue}
					blogPreviewStyle={blogPreviewStyle}
					previewContentStyle={previewContentStyle}
				/>
			</TabPanel>
		</Tabs>
	);
};

export default Editor;
