import { BasicModel } from "@/interfaces/GeneralInterfaces";
import { ModelConfig } from "@/interfaces/ModelConfig";
import { FormikFilterControlGenerator } from "@/lib/control-generator";

export interface FilterControlsProps {
  config: ModelConfig;
  requiredList?: {
    [key: string]: BasicModel[];
  };
}

const FilterControls: React.FC<FilterControlsProps> = ({
  config,
  requiredList,
}) => {
  return (
    <>
      <FormikFilterControlGenerator
        config={config}
        requiredList={requiredList}
      />
    </>
  );
};

export default FilterControls;
