import React, { useEffect, useState } from "react";
import Modal from "components/Modal/Modal";
import styled, { css } from "styled-components";
import { useToggleReturnTypes } from "hooks/useToggle";
import { FilterTagsType } from "utils/filter";
import CloseIcon from "components/icons/CloseIcon";
import { filters } from "todo/TodoService";

interface TodoFilterTypes extends useToggleReturnTypes {
  filterTags: FilterTagsType;
  handleFilter: (filter: FilterTagsType) => void;
}

const TodoFilter: React.FC<TodoFilterTypes> = ({
  toggle,
  handleToggle,
  handleFilter,
  filterTags,
}) => {
  const [form, setForm] = useState(filterTags);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    handleFilter(form);
    handleToggle();
  };

  const handleCheckBoxClick = (filter: string, tag: string): void => {
    setForm((prev) => {
      const tags = prev[filter];
      return {
        ...prev,
        [filter]: { ...tags, [tag]: !tags[tag] },
      };
    });
  };

  useEffect(() => {
    return () => setForm(filterTags);
  }, []);

  return (
    <>
      <Modal handleToggle={handleToggle} toggle={toggle} width="400px">
        <FilterForm onSubmit={handleSubmit}>
          <TodoFilterContainer>
            <Icon>
              <CloseIcon width="18" height="18" handler={handleToggle} />
            </Icon>
            <Header>Filter</Header>
            <Content>
              <FieldSet>
                {Object.entries(filters).map(([key, tags]) => (
                  <FilterDiv key={key}>
                    <Legend>{key}</Legend>
                    <TagDiv>
                      {Object.entries(tags).map(([tag, v]) => {
                        const checked = form[key][v];

                        const text = key === 'importance' 
                        ? `${tag} ${filters[key][tag]}`
                        : `${tag}`;

                        return (
                          <div key={tag}>
                            <Label htmlFor={tag} tag={tag} select={checked} />
                            <CheckBox
                              id={tag}
                              checked={checked}
                              type="checkbox"
                              onChange={() => handleCheckBoxClick(key, v)}
                            />
                            <BoldText>{text}</BoldText>
                          </div>
                        );
                      })}
                    </TagDiv>
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
  );
};

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
`;

const FilterForm = styled.form``;

const Header = styled.div`
  color: rgb(18 110 130);
  font-size: 26px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.div`
  flex: 1;
`;

const FieldSet = styled.fieldset``;

const Legend = styled.legend`
  color: #d3d3d3;
  font-weight: bold;
  font-size: 18px;
  padding-bottom: 5px;
  border-bottom: 1px solid #d3d3d3;
  margin-bottom: 12px;
`;

type LabelPropsTypes = {
  select: boolean;
  tag: string;
};

const Label = styled.label<LabelPropsTypes>`
  display: inline-block;
  border-radius: 5px;
  margin-right: 6px;
  cursor: pointer;
  width: 17px;
  height: 17px;
  ${(props) => {
    function colorGenerator() {
      const color: { [tag: string]: string } = {};

      return color[props.tag] || "rgb(18 110 130)";
    }
    return css`
      border: 2px solid ${colorGenerator()};
      background-color: ${props.select && colorGenerator()};
    `;
  }}
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
    color: rgb(18 110 130);
  }
`;

const BoldText = styled.span`
  font-weight: bold;
  margin-right: 6px;
`;

const TagDiv = styled.div`
  display: flex;
  vertical-align: middle;
`;

const FilterDiv = styled.div`
  margin-bottom: 30px;
`;
const Icon = styled.span`
  display: flex;
  flex-direction: row-reverse;
`;
export default TodoFilter;
