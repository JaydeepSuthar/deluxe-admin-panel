import styled from "styled-components";

import Button from "react-bootstrap/Button";
import Select from "react-bootstrap/FormSelect";

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}

	&:focus {
		outline: none;
	}
`;

const SelectField = styled(Select)`
	max-width: ${(props) => (props.width ? props.width : "max-content")};

	&:hover {
		cursor: pointer;
	}
`;

const ClearButton = styled(Button)`
	border-top-left-radius: 0;
	border-bottom-left-radius: 0;
	border-top-right-radius: 5px;
	border-bottom-right-radius: 5px;
	height: 32px;
	width: 32px;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DropdownFilter = ({
	filterCategory,
	filterSubCategory,
	onCategoryFilter,
	onSubCategoryFilter,
	category,
	subCategory,
}) => {
	return (
		<>
			<SelectField
				style={{ marginRight: "10px" }}
				value={filterCategory}
				onChange={(e) => {
					onCategoryFilter(e.target.value);
					console.log(`values ==> `, e.target.value);
				}}
				size="sm"
			>
				{/* <option value="">Select Category</option> */}
				{category.map((option) => (
					<option value={option.id}>{option.category_name}</option>
				))}
			</SelectField>

			{/* <SelectField
				value={filterSubCategory}
				onChange={(e) => {
					onSubCategoryFilter(e.target.value);
					console.log(`values ==> `, e.target.value);
				}}
				size="sm"
			>
				{subCategory.map((option) => (
					<option value={option.id}>
						{option.sub_category_name}
					</option>
				))}
			</SelectField> */}
		</>
	);
};

export default DropdownFilter;
