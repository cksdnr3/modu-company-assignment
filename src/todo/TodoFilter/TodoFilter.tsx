import React, { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import styled, { css } from 'styled-components';
import { useToggleReturnTypes } from 'hooks/useToggle';
import { FilterTagsType } from 'utils/filter';

interface TodoFilterTypes extends useToggleReturnTypes {
    filterTags: FilterTagsType;
    handleFilter: (filter: FilterTagsType) => void;
}

const TodoFilter: React.FC<TodoFilterTypes> = ({ toggle, handleToggle, handleFilter, filterTags }) => {
    const [form, setForm] = useState(filterTags);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        handleFilter(form);
        handleToggle();
    }

    const handleCheckBoxClick = (filter: string, tag: string) => {
        setForm(prev => {
            const tags = prev[filter];
            return {
                ...prev,
                [filter]: { ...tags, [tag]: !tags[tag] }
            }
        })
    }

    useEffect(() => {
        return () => setForm(filterTags);
    }, []);

    return(
        <>
        <Modal
        handleToggle={handleToggle} 
        toggle={toggle}
        width="400px"
        >
            <FilterForm onSubmit={handleSubmit}>
                <TodoFilterContainer>
                    <Header>Filter</Header>
                    <Content>
                        <FieldSet>
                            {Object.entries(form).map(([key, tags]) => (
                                <FilterDiv key={key}>
                                    <Legend>{key}</Legend>
                                    {Object.keys(tags).map((tag, idx) => {
                                        const checked = form[key][tag];
                                        return (
                                            <TagDiv>
                                                <Label
                                                htmlFor={`${idx}`}
                                                tag={tag}
                                                select={checked}
                                                key={tag} />
                                                <CheckBox
                                                id={`${idx}`}
                                                checked={checked}
                                                type="checkbox"
                                                onChange={() => handleCheckBoxClick(key, tag)} />
                                                <Text>{tag}</Text>
                                            </TagDiv>
                                        )})}
                                </FilterDiv>
                                ))}
                        </FieldSet>
                    </Content>
                    <Footer>
                        <Button>OK</Button>
                    </Footer>
                </TodoFilterContainer>
            </FilterForm>
        </Modal>
        </>
    )
}

const TodoFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 318px;
    & {
        div:first-child {
            align-items: center;
        }
        div:last-child {
            align-items: center;
            margin-bottom: 0;
        }
    }

    & > div {
        margin-bottom: 27px;
    }
`

const FilterForm = styled.form``

const Header = styled.div`
    font-size: 26px;
    font-weight: bold;
    text-align: center;
`;

const Content = styled.div`
    flex: 1;
`;

const FieldSet = styled.fieldset`

`

const Legend = styled.legend`
    color: #d3d3d3;
    font-weight: bold;
    font-size: 18px;
    padding-bottom: 4px;
    border-bottom: 1px solid #d3d3d3;
    margin-bottom: 9px;
`

type LabelPropsTypes = {
    select: boolean;
    key: string;
    tag: string;
}

const Label = styled.label<LabelPropsTypes>`
    font-size: 15px;
    &:hover {
        color: #0080ff;
    }
    display: inline-block;
    border-radius: 5px;
    margin-right: 6px;
    cursor: pointer;

    ${props => {
        switch (props.tag) {
            case 'pending':
                return css`
                width: 17px;
                height: 17px;
                border: 2px solid green;
                background-color: ${props.select && 'green'};
                `
            case 'ongoing':
                return css`
                width: 17px;
                height: 17px;
                border: 2px solid yellow;
                background-color: ${props.select && 'yellow'};

                `
            case 'completed':
                return css`
                width: 17px;
                height: 17px;
                border: 2px solid red;
                background-color: ${props.select && 'red'};
                `
            default :
                return css`
                width: 17px;
                height: 17px;
                border: 2px solid #d3d3d3;
                background-color: ${props.select && '#d3d3d3'};
                `
        }
    }
    }
`;

const CheckBox = styled.input`
    margin: 0 7px 0 2px;
    display: none;
    
`;

const Footer = styled.div`
    text-align: center;
`;

const Button = styled.button`
    width: 100%;
    height: 30px;
    &:hover {
        color: #0080ff;
    }
`

const Text = styled.span`
    font-weight: bold;
`

const TagDiv = styled.div`
    display: flex;
    margin-bottom: 12px;
    vertical-align: middle;
`

const FilterDiv = styled.div`
    margin-bottom: 10px;
`

export default TodoFilter;