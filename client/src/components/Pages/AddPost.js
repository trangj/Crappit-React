import React, { useState } from "react";
import {
	Button,
	Tabs,
	TabList,
	TabPanels,
	TabPanel,
	Tab,
	Heading,
	Divider,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import TextFieldForm from "../Forms/TextFieldForm";
import FileFieldForm from "../Forms/FileFieldForm";
import SelectFieldForm from "../Forms/SelectFieldForm";
import useTopics from "../../hooks/topic-query/useTopics";
import useAddPost from "../../hooks/post-query/useAddPost";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 512 * 1024;
const schema = yup.object({
	title: yup.string().required(),
	topic: yup.string().required(),
	content: yup.string(),
	link: yup.string().url(),
	file: yup
		.mixed()
		.test("fileSize", "File Size is too large", (value) =>
			value === undefined ? true : value.size <= FILE_SIZE
		)
		.test("fileType", "Unsupported File Format", (value) =>
			value === undefined ? true : SUPPORTED_FORMATS.includes(value.type)
		),
});

const AddPost = ({ match }) => {
	const {
		isLoading: topicsIsLoading,
		isError: topicsIsError,
		data: topicsData,
		error: topicsError,
	} = useTopics();
	const { isLoading, mutate } = useAddPost();
	const [selectedType, setSelectedType] = useState(0);

	const handleSubmit = ({ title, content, link, file, topic }) => {
		const types = ["text", "link", "photo"];
		const formData = new FormData();
		formData.append("file", file);
		formData.append("title", title);
		formData.append("link", link);
		formData.append("content", content);
		formData.append("type", types[selectedType]);
		formData.append("topic", topic);
		mutate({ formData });
	};

	return (
		<>
			<Heading>Create a post</Heading>
			<Divider my="3" />
			<Formik
				initialValues={{
					title: "",
					content: "",
					file: "",
					link: "",
					topic: match.params.topic,
				}}
				onSubmit={handleSubmit}
				validationSchema={schema}
			>
				{({ setFieldValue }) => (
					<Form>
						<Field
							label={"Topic"}
							name="topic"
							component={SelectFieldForm}
							placeholder={
								topicsIsLoading
									? "Loading..."
									: topicsIsError
									? topicsError.status.text
									: "Choose a topic"
							}
							mb="2"
						>
							{!topicsIsLoading &&
								topicsData.map((topic) => (
									<option key={topic.title} value={topic.title}>
										t/{topic.title}
									</option>
								))}
						</Field>
						<Tabs
							variant="enclosed"
							isFitted
							index={selectedType}
							onChange={setSelectedType}
						>
							<TabList>
								<Tab>Text</Tab>
								<Tab>Link</Tab>
								<Tab>Photo/GIF</Tab>
							</TabList>
							<TabPanels>
								<TabPanel>
									<Field label="Title" name="title" component={TextFieldForm} />
									<Field
										label="Content"
										name="content"
										multiline
										component={TextFieldForm}
									/>
									<Button type="submit" mt="2" isLoading={isLoading}>
										Post
									</Button>
								</TabPanel>
								<TabPanel>
									<Field label="Title" name="title" component={TextFieldForm} />
									<Field label="Link" name="link" component={TextFieldForm} />
									<Button type="submit" mt="2" isLoading={isLoading}>
										Post
									</Button>
								</TabPanel>
								<TabPanel>
									<Field label="Title" name="title" component={TextFieldForm} />
									<Field
										label="File"
										name="file"
										component={FileFieldForm}
										setFieldValue={setFieldValue}
									/>
									<Button type="submit" mt="2" isLoading={isLoading}>
										Post
									</Button>
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Form>
				)}
			</Formik>
		</>
	);
};
export default AddPost;
