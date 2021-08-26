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
        >
            <FilterForm onSubmit={handleSubmit}>
                <TodoFilterContainer>
                    <Header>Filter</Header>
                    <Content>
                        <FieldSet>
                            {Object.entries(form).map(([key, tags]) => (
                                    <div key={key}>
                                        <Legend>{key}</Legend>
                                        {Object.keys(tags).map(tag => {
                                            const checked = form[key][tag];
                                            return (
                                                <Label 
                                                select={checked}
                                                key={tag}>{tag.toUpperCase()}
                                                    <CheckBox
                                                    checked={checked}
                                                    type="checkbox"
                                                    onChange={() => handleCheckBoxClick(key, tag)} />
                                                </Label>
                                            )
                                        })}
                                    </div>
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
    overflow-y: auto;
`;

const FieldSet = styled.fieldset`
    width: 100%;
    margin-bottom: 13px;
`

const Legend = styled.legend`
    font-weight: bold;
    font-size: 19px;
    margin-bottom: 9px;
`

const Label = styled.label<{select: boolean}>`
    font-size: 15px;
    &:hover {
        color: #0080ff;
    }
    ${props => 
        props.select &&
        css`
            &:hover: white;
            color: #0080ff;
        `
    }
`;

const CheckBox = styled.input`
    margin: 0 7px 0 2px;
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

export default TodoFilter;