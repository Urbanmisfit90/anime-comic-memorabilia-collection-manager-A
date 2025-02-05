import React, { useState, useEffect, useCallback } from 'react';
import { TextField, Button, Paper, Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, styled } from '@mui/material';

interface Item {
    _id?: string;
    name: string;
    brand: string;
    series?: string;
    character?: string;
    type?: string;
    condition?: string;
    tags?: string;
    photo?: string | null;
    edition?: string;
}

interface ItemFormProps {
    onSave: (updatedCollection: Item[]) => void;
    editingItem: Item | null;
    editIndex: number | null;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 800,
    margin: 'auto',
    marginTop: theme.spacing(2),
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    width: '100%',
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    backgroundColor: '#1976d2',
    color: 'white',
    '&:hover': {
        backgroundColor: '#1565c0',
    },
}));

const FileInput = styled('input')({
    marginBottom: '16px',
});

const ItemForm: React.FC<ItemFormProps> = ({ onSave, editingItem, editIndex }) => {
    const [item, setItem] = useState<Item>({
        name: '',
        brand: '',
        series: '',
        character: '',
        type: '',
        condition: '',
        tags: '',
        photo: null,
        edition: '',
    });

    useEffect(() => {
        if (editingItem) {
            setItem({ ...editingItem });
        } else {
            setItem({
                name: '',
                brand: '',
                series: '',
                character: '',
                type: '',
                condition: '',
                tags: '',
                photo: null,
                edition: '',
            });
        }
    }, [editingItem]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    }, []);

    const handleSelectChange = useCallback((event: SelectChangeEvent) => {
        const { name, value } = event.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    }, []);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setItem(prevItem => ({ ...prevItem, photo: reader.result as string }));
            reader.readAsDataURL(file);
        } else {
            setItem(prevItem => ({ ...prevItem, photo: null }));
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(prevCollection => {
            if (editIndex !== null) {
                return prevCollection.map((existingItem, index) =>
                    index === editIndex ? item : existingItem
                );
            } else {
                return [...prevCollection, item];
            }
        });

        if (editIndex === null) {
            setItem({
                name: '',
                brand: '',
                series: '',
                character: '',
                type: '',
                condition: '',
                tags: '',
                photo: null,
                edition: '',
            });
        }
    };

    return (
        <StyledPaper elevation={0}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <StyledTextField
                        label="Item Name"
                        name="name"
                        required
                        value={item.name}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <StyledTextField
                        label="Brand"
                        name="brand"
                        required
                        value={item.brand}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <StyledTextField
                        label="Series"
                        name="series"
                        value={item.series}
                        onChange={handleInputChange}
                        fullWidth
                    />
                    <StyledTextField
                        label="Character"
                        name="character"
                        value={item.character}
                        onChange={handleInputChange}
                        fullWidth
                    />

                    <StyledFormControl fullWidth>
                        <InputLabel>Type</InputLabel>
                        <Select
                            name="type"
                            value={item.type || ''}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            <MenuItem value="">Select Type</MenuItem>
                            <MenuItem value="Action Figure">Action Figure</MenuItem>
                            <MenuItem value="Prop">Prop</MenuItem>
                            <MenuItem value="Box Set">Box Set</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <StyledFormControl fullWidth>
                        <InputLabel>Condition</InputLabel>
                        <Select
                            name="condition"
                            value={item.condition || ''}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            <MenuItem value="">Select Condition</MenuItem>
                            <MenuItem value="New">New</MenuItem>
                            <MenuItem value="Mint">Mint</MenuItem>
                            <MenuItem value="Used">Used</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <StyledFormControl fullWidth>
                        <InputLabel>Edition</InputLabel>
                        <Select
                            name="edition"
                            value={item.edition || ''}
                            onChange={handleSelectChange}
                            fullWidth
                        >
                            <MenuItem value="">Select Edition</MenuItem>
                            <MenuItem value="Standard">Standard</MenuItem>
                            <MenuItem value="Deluxe">Deluxe</MenuItem>
                            <MenuItem value="Collector's">Collector's</MenuItem>
                            <MenuItem value="Special">Special</MenuItem>
                        </Select>
                    </StyledFormControl>

                    <StyledTextField
                        label="Tags"
                        name="tags"
                        value={item.tags || ''}
                        onChange={handleInputChange}
                        fullWidth
                    />

                    <FileInput type="file" name="photo" onChange={handleFileChange} />
                    {item.photo && <img src={item.photo} alt="preview" width={100} />}

                    <StyledButton type="submit" variant="contained">
                        {editIndex !== null ? 'Update Item' : 'Add Item'}
                    </StyledButton>
                </Stack>
            </form>
        </StyledPaper>
    );
};

export default ItemForm;