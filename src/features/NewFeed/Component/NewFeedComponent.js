import React, { useEffect, useRef, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { createNewPostApi, uploadImageApi } from '../Ssrvice/ApiHandler';
import JoditEditor from "jodit-react";
import { getCurrentUserDetails } from '../../../Auth';
import { allCategoriesApi } from '../../Categories/Service/ApiHandler';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewFeedComponent = (props) => {

    const editor = useRef(null);
    const [content, setContent] = useState(''); // This is for JoditEditor Tag

    const [category, setCategory] = useState([]); // This is for JoditEditor Tag

    const [image, setImage] = useState(null);

    const navigate = useNavigate();


    // const config = {
    //   //   placeholder: "Start writing...",
    //   useNativeTooltip: true,
    //   showCharsCounter: false,
    //   showWordsCounter: false,
    //   showXPathInStatusbar: false
    // };

    const [postData, setPostData] = useState({
        post_title: '',
        post_content: '',
        category_id: 'Select..'
    });

    function getAllCategories() {
        allCategoriesApi().then(resp => {
            setCategory(resp.data);
            console.log('Category - ');
            console.log(category);
        }).catch(error => {
            console.log(error);
        })
    }

    //Create New Post
    function newPost() {
        createNewPostApi(getCurrentUserDetails().id, postData.category_id, postData).then((resp) => {

            // Upload Image inside the creating new Post so that it will upload before creating Post
            uploadImageApi(image, resp.data.post_id).then((img) => {
                console.log('Image Uploaded');
                console.log(img);
            }).catch(error => {
                console.log('Error' + error);
            })

            console.log('New Post - ');
            console.log(resp);
            toast.success("Post published!!", { position: toast.POSITION.BOTTOM_CENTER })
            navigate('/user/my-feeds');
        }).catch(error => {
            console.log('Error' + error);
            toast.success(error);
        })
    }

    useEffect(() => {
        document.title = 'Weblog - New Story';
        getAllCategories();

        console.log('data props - ');
        //-CHANGES
        console.log(props.data);
        //-CHANGES

    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPostData({...postData, [name]: value});
        console.log(name + ' : ' + value);
    }

    const handlePostContentFieldChange = (data) => {
        setPostData({...postData, 'post_content': data});
    }

    // Handle Image Upload OnChange Event
    const handleUploadImageChange = (event) => {
        console.log('image Data');
        console.log(event.target.files[0]);
        setImage(event.target.files[0]);
    }

    const handlePublish = (event) => {
        event.preventDefault();
        console.log('Post Data');
        console.log(postData);
        console.log('Content and its type - ');
        console.log(content);
        console.log(typeof(content));

        //Post added
        newPost();
    }

    const handleReset = () => {
        setPostData({
          post_title: '',
          post_content: '',
          category_id: 'Select..'
        });
        document.getElementById("category").value = "Select..";
        document.getElementById("jodit").value = "";
        document.getElementById("imageData").value = ""; // Resetting Input type = file
        setContent('');
    }

  return (
    <div>
      <h2>Unleashed Your Thoughts Here...</h2>
      <form>
        <FormGroup className="text-justify mx-5">
          <Label for="title">Story Title</Label>
          <Input id="title" type="text" placeholder="Enter the titles" name="post_title" value={postData.post_title} onChange={handleChange}/>
        </FormGroup>

        <FormGroup className="text-justify mx-5">
          <Label for="content">Story Content</Label>
          <JoditEditor id="jodit" ref={editor} value={content} onChange={handlePostContentFieldChange} height="200px" />
        </FormGroup>

        <FormGroup className="text-justify mx-5">
            <Label for="category">Select Category</Label><br/>
            <Input type="select" id="category" name="category_id" placeholder='Select..' onChange={handleChange} style={{width:'100%'}}>
                <option defaultValue="select" select="true">Select..</option>
              {category && (
                category.map((c, index) => {
                    return (<option key={index} value={c.categoryId}>{c.category_title}</option>);
                })
              )}
            </Input>
        </FormGroup>

        <FormGroup className='text-justify mx-5'>
            <Label for="imageData">Upload Image</Label>
            <Input id="imageData" type="file" onChange={handleUploadImageChange}/>
        </FormGroup>
        
        <Button className='mx-2 my-3' color="primary" onClick={handlePublish}>Publish</Button>
        <Button className='mx-2 my-3' color="danger" onClick={handleReset}>Reset Content</Button>
      </form>
    </div>
  );
}

export default NewFeedComponent
