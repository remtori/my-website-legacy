import { h } from 'preact';
import { Formik, Form, Field, ErrorMessage, FieldConfig, FormikProps } from 'formik';
import { ContentData } from './index';

import style from './MetaForm.scss';

interface MetaFormProps {
	content: Partial<ContentData>;
}

export default function MetaForm(props: MetaFormProps) {
	return (
		<Formik
			initialValues={props.content}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					console.log(values);
					setSubmitting(false);
				}, 400);
			}}
		>
			{
				({ isSubmitting, values }: FormikProps<ContentData>) => (
					<Form class={style.form}>
						<div class={style.previewImg}>
							<label for='file_previewImg'>Preview Image</label>
							<img class='error-image' />
							<Field type='file' name='previewImg' id='file_previewImg' />
						</div>
						<div class={style.textForm}>
							<FormField
								label='ID'
								explain='url ex: /something/ID'
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
							<button type='submit' disabled={isSubmitting}>Submit</button>
						</div>
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
						<span class={style.explain}>
							({explain})
						</span>
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
