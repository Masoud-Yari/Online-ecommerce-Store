import React, {useState, useEffect} from 'react';
import {Table, 
        TableBody, 
        TableHead, 
        TableCell, 
        TableRow, 
        IconButton, 
        TableContainer,
        TablePagination,
        CircularProgress
    } from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch, useSelector} from 'react-redux';
import {getProducts, deleteProduct} from '../../actions/productsAction';

const useStyle = makeStyles(theme => ({
    tableContainer: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
    },
    progress: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        width: '100%', 
        height: '80vh'
    }
}))


const ProductsTable = ({trigger, handleEdit}) => {
    const classes = useStyle();

    const {products, loading, error} = useSelector(state => state.productsList);
    const {success, error: deleteError} = useSelector(state => state.deleteProduct);
    const dispatch = useDispatch();

    // table pages
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (e, newPage) => {
        setPage(newPage);
    }


    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(e.target.value);
        setPage(0);
    }

    const handleDelete = (productId) => {
        dispatch(deleteProduct(productId));
    }
    

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch, success, trigger]);

    if(products) {
        return (
            <TableContainer className={classes.tableContainer}>
            {deleteError ? <h1>{deleteError}</h1> : ''}
                <Table size= "small">
                    <TableHead>
                        <TableRow style={{ textTransform: 'uppercase' }} >
                            <TableCell>Name</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Number of Product</TableCell>
                            <TableCell>Brand</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(product => (
                            <TableRow style={{ textTransform: 'capitalize' }} key={product._id} >
                                <TableCell component="th" scope="row" >{product.name}</TableCell>
                                <TableCell >{product.category}</TableCell>
                                <TableCell >{product.price}</TableCell>
                                <TableCell >{product.numberOfProduct}</TableCell>
                                <TableCell >{product.brand}</TableCell>
                                <TableCell >{product.image}</TableCell>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>
                                    <IconButton color= "primary" onClick={ () => handleEdit(product._id)} >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color= "secondary" onClick={ () => handleDelete(product._id)} >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={products.length}
                    rowsPerPageOptions={[10, 15, 20]}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        )
    }else if(loading) {
        return (<div className={classes.progress}>
                <CircularProgress />
                </div>)
    }else if(error) {
        return <Alert variant="filled" severity="error">{error}</Alert>
    }else {
        return(
            <Alert variant="filled" severity="info">No Result</Alert>
        )
    }
    
}

export default ProductsTable;
