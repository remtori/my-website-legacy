import { h, RenderableProps } from 'preact';
import { useState } from 'preact/hooks';
import { Formik, Form, Field, ErrorMessage, FieldConfig, FormikProps } from 'formik';
import { ContentData } from './index';
import Icon, { icons } from '~/components/Icon';
import Editor from './CodeEditor';

import style from './PageForm.m.scss';

interface MetaFormProps {
	content: Partial<ContentData>;
	onSubmit: (values: ContentData) => Promise<void>;
}

export default function MetaForm(props: RenderableProps<MetaFormProps>) {

	const [ textContent, setTextContent ] = useState(props.content.content || '');

	function onInput({ value }: { value: string }) {
		setTextContent(value);
	}

	return (
		<Formik
			initialValues={props.content}
			onSubmit={(values, { setSubmitting }) => {
				props
					// validate function ensure that all the properties are filled
					.onSubmit(
						{
							...values,
							content: textContent
						} as ContentData
					)
					.then(() => setSubmitting(false));
			}}
		>
			{
				({ isSubmitting, values }: FormikProps<ContentData>) => (
					<Form>
						<div class={style.form}>
							<div class={style.previewImg}>
								<label for='file_previewImg'>Preview Image</label>
								<img class='error-image' />
								<Field type='file' name='previewImg' id='file_previewImg' />
							</div>
							<div class={style.textForm}>
								<FormField
									label='ID'
									explain='url example: /something/ID'
									type='text'
									name='id'
									disabled={!props.content.new}
									required
								/>
								<FormField label='Title' type='text' name='title' needValidate required />
								<FormField label='Description' as='textarea' name='description' rows={5} />
								<FormField
									label='Tags'
									explain='The list of tag separated by a single space'
									type='text'
									name='tags'
								/>
								<FormField label='Author' type='text' name='author' needValidate required />
								<div class={style.checkbox} >
									<Field
										type='checkbox'
										name='isFullPage'
										id='checkbox_isFullPage'
										value={true}
										checked={values.isFullPage}
									/>
									<label for='checkbox_isFullPage'>
										Is Full Page
										<span class={style.explain}>
											(whether or not we display this page without a header, footer and its container)
										</span>
									</label>
								</div>
							</div>
						</div>
						<Editor onInput={onInput} value={textContent} />
						<button class={style.submitBtn} type='submit' disabled={isSubmitting}>Submit</button>
					</Form>
				)
			}
		</Formik>
	);
}

function FormField(
	props: FieldConfig & {
		label: string;
		needValidate?: boolean;
		wrapper?: object;
		[prop: string]: any;
	}
) {
	const {
		type, as, name, label,
		needValidate = false,
		wrapper = {},
		explain,
		...others
	} = props;
	const id = type + name;
	return (
		<div {...wrapper}>
			<label for={id}>
				{label}
				{
					props.required && <span class={style.required}>*</span>
				}
				{
					explain && (
						<a href='javascript:void(0)' class={style.explain} title={explain}>
							<Icon icon={icons.faQuestionCircle} />
						</a>
					)
				}
			</label>
			<Field as={as} type={type} name={name} {...others} />
			{
				needValidate &&
				<ErrorMessage name={name} component='div' />
			}
		</div>
	);
}
