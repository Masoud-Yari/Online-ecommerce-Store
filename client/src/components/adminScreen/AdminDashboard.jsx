import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    Container,
    Button,
    Typography,
    TextField,
    CssBaseline,
    CircularProgress,
    Tabs,
    Tab,
    TextareaAutosize,
    Paper
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {addProduct, getProducts} from '../../actions/productsAction';
import ProductsTable from './ProductsTable';

const useStyle = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    submit: {
        margin: '20px auto',
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 0,
        transition: 'all 0.5s ease',
        backgroundColor: '#1f1f1f',
        color: '#f1f1f1',
        '&:hover': {
            backgroundColor: '#000',
            borderColor: '#f1f1f1',
            color: '#f1f1f1',
        }
    }, 
    progress: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        height: '80vh'
    },
    textArea: {
        width: '100%',
        resize: 'none',
        marginTop: theme.spacing(2),
        fontSize: 16
    }
}))

const AdminDashboard = () => {

    const classes = useStyle();

    // declare a state for tabs
    const [value, setvalue] = useState(0);


    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [numberOfProduct, setNumberOfProduct] = useState('');
    const [description, setDescription] = useState('');

    // use to know are we in edit mode or not
    const [edit, setEdit] = useState(false);

    // set a trigger so can refresh list of products in ProductsTable component
    const [trigger, setTrigger] = useState(false);

    const {success: addSuccess, loading: addLoading, error: addError} = useSelector(state => state.addProduct);
    const {products} = useSelector(state => state.productsList);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, addSuccess]);

    const handleEdit = (productId) => {
        const editProduct = products.find(product => product._id === productId);
        setId(productId);
        setName(editProduct.name);
        setCategory(editProduct.category);
        setPrice(editProduct.price);
        setImage(editProduct.image);
        setBrand(editProduct.brand);
        setNumberOfProduct(editProduct.numberOfProduct);
        setDescription(editProduct.description);

        setEdit(true);
    }

    // HandleChange for tabs
    const handleChange = (event, newValue) => {
        setvalue(newValue);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(edit) {
            dispatch(addProduct({id, name,category, price, image, brand, numberOfProduct, description}));
            setTrigger(!trigger);
            setEdit(false);
        }else {
            dispatch(addProduct({name,category, price, image, brand, numberOfProduct, description}));
            setTrigger(!trigger);
        }
    }

    return (
        <>  
            <Tabs
                variant="scrollable"
                value={value}
                onChange={handleChange}
            >
                <Tab label="Add or Edit Items" />
                <Tab label="Items List" />
            </Tabs>
            {value === 0 && 
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Paper elevation={10} className={classes.paper}>
                        <Typography component="h1" variant="h5">
                        Add New Product
                        </Typography>
                        {addError ? <h1>{addError}</h1> : ''}
                        <form className={classes.form} onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Category"
                            name="category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                        <TextField
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            label="Price"
                            type="number"
                            name="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="image"
                            value={image}
                            label="Image"
                            type="text"
                            onChange={e => setImage(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="brand"
                            value={brand}
                            label="Brand"
                            type="text"
                            onChange={e => setBrand(e.target.value)}
                        />
                        <TextField
                            size="small"
                            variant="outlined"
                            margin="normal"
                            required
                            name="numberOfProduct"
                            value={numberOfProduct}
                            label="NumberOfProduct"
                            type="number"
                            onChange={e => setNumberOfProduct(e.target.value)}
                        />
                        <TextareaAutosize 
                            className={classes.textArea}
                            rowsMin={6}
                            rowsMax={10}
                            required
                            name="description"
                            value={description}
                            placeholder="Description"
                            onChange={e => setDescription(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            className={classes.submit}
                        >
                            {edit ? 'Edit' : 'Create'}
                        </Button>
                        </form>
                    </Paper>
                </Container>
            }
            {value === 1 &&
                <>
                    {addLoading ? 
                        <div className={classes.progress}>
                            <CircularProgress />
                        </div> : 
                    <ProductsTable trigger={trigger} handleEdit={handleEdit} />
                    }
            </>
            }
        </>
    )
}

export default AdminDashboard;