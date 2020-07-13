import React, {  useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask } from '../../redux';
import Form, {
    ButtonItem,
    GroupItem,
    SimpleItem,
    RequiredRule,
    StringLengthRule,
} from 'devextreme-react/form';
import 'devextreme-react/autocomplete';
import ImageUploader from 'react-images-upload';
import './styles.css';

/** 
 * Adding task by form (Description,Image)
 * includes 2 methods:
 * 1.  onSelectedFilesChanged - attaches  selected file
 * 2.  handleSubmit - sends the form throught dispatch event
 */
const AddTaskForm = (props) => {
    const [dataForm, setDataForm] = useState({
        Description: '',
        File: null,
        ImageUrl: '',
        uploadedFileValid: true,
        error: '',
        successMsg:''
    });
    const [uploadedFileValid, setUploadedFileValid] = useState(false)
   
    const buttonOptions = {
        text: 'Add Task',
        type: 'success',
        useSubmitBehavior: true,
    }
    const formElement = React.createRef();
    const formImageElement = React.createRef();
    const { error ,successMsg } = useSelector((state) => state.addTask);
    const dispatch = useDispatch()
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dataForm.File) {
            const formData = new FormData();
            formData.append('File', dataForm.File);
            formData.append('Description', dataForm.Description);

            dispatch && dispatch(addTask(formData));

            if (formImageElement.current && formImageElement.current.state) {
                formImageElement.current.state.files = [];
                formImageElement.current.state.pictures = [];
            }
            let initFormData = {
                Description: '',
                File: null,
                ImageUrl: '',
                uploadedFileValid: true
            };
            setDataForm(initFormData);  

        }

    }
    const onSelectedFilesChanged = async (e) => {
        let _fileImg = (e && e.length > 0) ? e[0] : null;

        let clonedformTask = Object.assign({}, dataForm);
        clonedformTask.File = _fileImg;
        clonedformTask.uploadedFileValid = _fileImg ? true : false;

        setDataForm(clonedformTask);
        setUploadedFileValid(_fileImg ? true : false);
    }



    return (
        <div className="main">
            <div className="container">
                {
                    error && <span className="errorTxt">Error:{error}</span>
                }
                {
                    successMsg && <span className="successTxt">Success: {successMsg}</span>
                }
                <div>
                    <h5>Task Data</h5>
                    <form
                        action="ulpoad-task"
                        ref={formElement}
                        onSubmit={handleSubmit}
                    >
                        <Form
                            formData={dataForm}
                            readOnly={false}
                            showColonAfterLabel={true}
                            showValidationSummary={true}
                        >
                            <GroupItem  >
                                <SimpleItem dataField="Description">
                                    <RequiredRule message="Description is required" />
                                    <StringLengthRule min={2} message="Description must have at least 2 symbols" />
                                    <StringLengthRule max={100} message="Description must be maximum length of 100symbols" />
                                </SimpleItem>
                            </GroupItem>
                            <GroupItem>
                                {!uploadedFileValid && (<span className="imageUploadErr">* Image file is required</span>)}

                                <ImageUploader ref={formImageElement}
                                    withIcon={false}
                                    withPreview={true}
                                    singleImage={true}
                                    label=""
                                    errorClass="imageUploadErr"
                                    buttonText="Browse Images"
                                    onChange={onSelectedFilesChanged}
                                    imgExtension={[
                                        '.jpg',
                                        '.gif',
                                        '.png',
                                        '.gif',
                                        '.svg',
                                    ]}
                                    maxFileSize={5242880}
                                    fileSizeError=" file size is too big"
                                />
                                <span className="note">
                                    {'Maximum file size: '}
                                    <span>5242880</span>
                                    {'.'}
                                </span>

                            </GroupItem>
                            <ButtonItem
                                horizontalAlignment="left"
                                buttonOptions={buttonOptions}
                            />
                        </Form>
                    </form>

                </div>
            </div>
        </div>
    );

}
export default AddTaskForm; 