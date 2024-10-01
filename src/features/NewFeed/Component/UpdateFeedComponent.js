import React, { useEffect, useRef, useState } from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { createNewPostApi, updatePostApi, uploadImageApi } from '../Ssrvice/ApiHandler';
import JoditEditor from "jodit-react";
import { getCurrentUserDetails } from '../../../Auth';
import { allCategoriesApi } from '../../Categories/Service/ApiHandler';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Update Component

const UpdateFeedComponent = (props) => {

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
        category_id: 1,
        image: ''
    })

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
    function updatePost() {
        updatePostApi(postData, props.data.data.post_id).then((resp) => {
            console.log('Post to Update - ');
            console.log(resp);
            toast.success("Post Updated Successfully!! 🤗", { position: toast.POSITION.BOTTOM_CENTER });
            
        }).catch(error => {
            console.log('Error' + error);
            toast.error("Something went wrong!!", { position: toast.POSITION.BOTTOM_CENTER });
        })
    }

    useEffect(() => {
        getAllCategories();

        console.log('data props - ');
        console.log(props.data.data);
        setPostData({
            post_title: props.data.data.post_title,
            post_content: props.data.data.post_content,
            category_id: props.data.data.category.categoryId,
            image: props.data.data.image
        });
        setContent(props.data.data.post_content);
        setImage(props.data.data.image);

    }, []);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPostData({...postData, [name]: value});
        //console.log(event);
    }

    const handlePostContentFieldChange = (data) => {
        setPostData({...postData, 'post_content': data})
    }

    // Handle Image Upload OnChange Event
    // const handleUploadImageChange = (event) => {
    //     console.log('image Data');
    //     console.log(event.target.files[0]);
    //     setImage(event.target.files[0]);
    // }

    const handleUpdate = (event) => {
        event.preventDefault();
        console.log('Post Data');
        console.log(postData);
        console.log('Content and its type - ');
        console.log(content);
        console.log(typeof(content));

        //Post updated
        updatePost();
        navigate(`/user/my-feeds`);
    }

    const handleReset = () => {
        setPostData({
          post_title: "",
          post_content: "",
          category_id: "",
          image: ""
        });
        document.getElementById("category").value = "select";
        document.getElementById("jodit").value = "";
        document.getElementById("imageData").value = ""; // Resetting Input type = file
        setContent('');
    }

  return (
    <div>
      <h2>New Story</h2>
      <form>
        <FormGroup className="text-justify mx-5">
          <Label for="title">Story Title</Label>
          <Input id="title" type="text" placeholder="Enter the titles" name="post_title" value={postData.post_title} onChange={handleChange}/>
        </FormGroup>

        <FormGroup className="text-justify mx-5">
          <Label for="content">Story Content</Label>
          {/* <Input id="content" type="textarea" placeholder="Start here.." name="post_content" value={postData.post_content} onChange={handleChange} style={{ height: "300px" }}/> */}
          <JoditEditor id="jodit" ref={editor} value={content} onChange={handlePostContentFieldChange} height="200px" />
        </FormGroup>

        <FormGroup className="text-justify mx-5">
            <Label for="category">Select Category</Label><br/>
            <Input type="select" id="category" name="category_id" placeholder='Select..' onChange={handleChange} style={{width:'100%'}}>
                <option value="select" disabled>Select..</option>
                <option value={postData.category_id} selected>{props.data.data.category.category_title}</option>
              {category && (
                category.map((c, index) => {
                    return (<option key={index} value={c.categoryId}>{c.category_title}</option>);
                })
              )}
            </Input>
        </FormGroup>

        {/* <FormGroup className='text-justify mx-5'>
            <Label for="imageData">Upload Image</Label>
            <Input id="imageData" type="file" onChange={handleUploadImageChange} defaultValue={image} />
        </FormGroup> */}
        
        <Button className='mx-2 my-3' color="primary" onClick={handleUpdate}>Update</Button>
        <Button className='mx-2 my-3' color="danger" onClick={handleReset}>Reset Content</Button>
      </form>
    </div>
  );
}

export default UpdateFeedComponent
