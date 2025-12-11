import type { Preview, Decorator } from "@storybook/react";
import { useEffect } from "react";
import { useViewMode } from "../store/useViewMode";
import "../app/globals.css";

const withViewMode: Decorator = (Story, context) => {
  const isCreative = context.parameters?.viewMode?.isCreative ?? false;

  useEffect(() => {
    // ensure stories start in a loaded state and with the requested mode
    useViewMode.setState({ isCreative });
    useViewMode.getState().setLoaded();
  }, [isCreative]);

  return Story();
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f5f5f5" },
        { name: "dark", value: "#000000" },
      ],
    },
  },
  decorators: [withViewMode],
};

export default preview;
