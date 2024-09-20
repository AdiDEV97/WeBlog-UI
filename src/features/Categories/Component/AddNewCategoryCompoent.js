import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, Form, FormGroup, Input, Label, Table } from 'reactstrap'
import '../StyledComponent/Style.css';
import { AddNewCategoryApi, allCategoriesApi, DeleteCategoryApi, UpdateCategoryApi } from '../Service/ApiHandler'
import '../StyledComponent/Style.css';

// Add New Category Component

const AddNewCategoryCompoent = () => {

    const [category, setCategory] = useState([])

    const [categoryData, setCategoryData] = useState({
        category_title: '',
        category_description: ''
    })

    const [updateCat, setUpdateCat] = useState({
        category_title: '',
        category_description: ''
    });

    const [updateId, setUpdateId] = useState();

    const [popUp, setPopUp] = useState(false)

    const [addStyle, setAddStyle] = useState({
        filter: 'blur(0px)',
        pointerEvents: ''
      });

    function getAllCategories() {
        allCategoriesApi().then(resp => {
            setCategory(resp.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        document.title = 'Weblog - Categories';
        getAllCategories();
    }, [])

    const handleCategoryChange = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setCategoryData({...categoryData, [name]: value});
    }

    const handleUpdateCategoryChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setUpdateCat({...updateCat, [name]: value});
    }

    function newCategory() {
        AddNewCategoryApi(categoryData).then(resp => {
            setCategory([...category, resp.data]) // This is to rerender the page onClick of Add button to reflect the real-time changes.
            toast.success("Category added successfully!!");
        }).catch(err => {
            console.log('Error - ' + err);
            toast.success(err);
        })
    }

    const handleSubmitCategory = (event) => {
        event.preventDefault();
        console.log('Category Data - ');
        console.log(categoryData);
        newCategory();
    }

    const handleReset = () => {
        setCategoryData({category_title: '', category_description: ''});
        setUpdateCat({category_title: '', category_description: ''});
    }

    const handleCancelPopUp = () => {
        setPopUp(false);
        setAddStyle({
            filter: 'blur(0px)',
            pointerEvents: '',
            overflowY: ''
        })
        document.body.style.overflowY= '';
    }

    

    const handleDelete = (category_id) => {

        var userConfirmation = window.confirm("Once delete cannot be retrived. Are you sure you want to delete this category?");

        if(userConfirmation === true) {
            DeleteCategoryApi(category_id).then((resp) => {
            setCategory(category.filter((ce) => {return ce.categoryId != category_id}));
            console.log('Category deleted successfully!!');
            console.log(resp);
            toast.success("Category deleted successfully!!");
        })
        }
        else {
            setCategory(category);
            toast.error("Can't deleted!!");
        }
    }


    const handleUpdateButton = (category_id) => {
        console.log('id - ' + category_id);
        setPopUp(true);

        category.map((ce) => {
            if(ce.categoryId === category_id) {
                setUpdateId(ce.categoryId);
                setUpdateCat({category_title: ce.category_title,
                category_description: ce.category_description})
                console.log('Found!!');
                console.log('Data to Update is - ');
                console.log(updateCat);
            }
        })
        setAddStyle({
            filter: 'blur(3px)',
            pointerEvents: 'none',
            overflowY: ''
          });
          document.body.style.overflowY= 'hidden'
    }

    const handleConfirmUpdate = (e) => {
        e.preventDefault();

        category.map((ce) => { 
            if(ce.categoryId === updateId) {
                console.log(updateCat);
                console.log(ce.categoryId);

                updateCat && (UpdateCategoryApi(updateId, updateCat).then((resp) => {
                    console.log('resp');
                    console.log(resp);
                    setCategory([...category]);
                    console.log('Data Updated Successfully!!');
                    toast.success("Data Updated Successfully!!");
                }).catch(err => {
                    console.log('Error - ' + err);
                    toast.error("Error");}))
                    }
            else {
                console.log('Else');
            }
        })
        setPopUp(false);
        setAddStyle({
            filter: 'blur(0px)',
            pointerEvents: '',
            overflowY: ''
        })
        document.body.style.overflowY= '';
        this.forceUpdate();
    }
    


    const UpdateCategoryComponent = <>
      <Form className='text-justify m-3' onSubmit={handleConfirmUpdate}>
        <span className="cancelPopUp material-symbols-rounded" onClick={handleCancelPopUp}>cancel</span>
        <FormGroup>
            <Label for="categoryTitle">Category Title</Label>
            <Input id="categoryTitle" type="text" placeholder="Enter the Category Title..." name="category_title" value={updateCat.category_title} onChange={handleUpdateCategoryChange} autoFocus/>
        </FormGroup>

        <FormGroup>
            <Label for="categoryDesc">Category Description</Label>
            <Input id="categoryDesc" type="textarea" placeholder="Enter the Category Description..." name="category_description" value={updateCat
            .category_description} onChange={handleUpdateCategoryChange} style={{ height: "150px" }}/>
        </FormGroup>

        <Button color='success' type='submit' className='mx-3'>Confirm Update</Button>
        <Button color='info' className='mx-3' onClick={handleReset}>Reset</Button>
      </Form>
    </>

  return (
    <div>

        <Grid container spacing={4} style={addStyle}>
            <Grid className="borders" item xs={8}>
                <h2>Add New Category</h2>
            <Form className='text-justify m-5' onSubmit={handleSubmitCategory}>
                <FormGroup>
                    <Label for="categoryTitle">Category Title</Label>
                    <Input id="categoryTitle" type="text" placeholder="Enter the Category Title..." name="category_title" value={categoryData.category_title} onChange={handleCategoryChange} />
                </FormGroup>

                <FormGroup>
                    <Label for="categoryDesc">Category Description</Label>
                    <Input id="categoryDesc" type="textarea" placeholder="Enter the Category Description..." name="category_description" value={categoryData
                    .category_description} onChange={handleCategoryChange} style={{ height: "150px" }}/>
                </FormGroup>

                <Button color='success' type='submit' className='mx-3'>Add</Button>
                <Button color='info' className='mx-3' onClick={handleReset}>Reset</Button>

            </Form>
            </Grid>
            <Grid className="borders" item xs={4}>
                <h2>Available Categories</h2>
                <div className='category-table'>
                    <Table className='category-row text-justify border' size="sm" hover style={{width:'100%'}}>
                        <thead>
                        <tr>
                            <th className='border'>#</th>
                            <th className='catTR' style={{width:'70%'}}>Category</th>
                            <th className='operations'></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            category.map((c, index) => {
                                return(
                                    <tr key={index}>
                                        <td className='border' scope="row">{index+1}</td>
                                        <td className='categoryTitle'>{c.category_title}</td>
                                        <td>
                                            <span className='updateButton material-symbols-outlined mx-2' color='warning' onClick={() => {handleUpdateButton(c.categoryId)}}>Update</span>
                                            <span className='deleteButton material-symbols-outlined mx-2' color='danger' onClick={() => {handleDelete(c.categoryId)}}>Delete</span>
                                        </td>
                                        
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </Grid>
        </Grid>

      <div className='popUpTable rounded'>
        {popUp ? UpdateCategoryComponent : null}
      </div>

    </div>
  )
}

export default AddNewCategoryCompoent
