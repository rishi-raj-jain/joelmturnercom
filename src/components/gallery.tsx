/** @jsx jsx */
import { jsx } from "theme-ui";
import { useKeypress } from "../hooks";
import { memo, ReactElement, useCallback } from "react";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

const GalleryImage = memo(
  ({
    node,
    index,
    onKeyPress,
    onClick,
  }: {
    node: GalleryImage;
    index: number;
    onKeyPress: (node: GalleryImage) => void;
    onClick: (node: GalleryImage) => void;
  }): ReactElement | null => {
    const handleKeyPress = useCallback((event) => {
      if (onKeyPress) {
        onKeyPress(node);
      }
    }, []);

    const handleClick = useCallback((event) => {
      if (onClick) {
        onClick(node);
      }
    }, []);
    if (!node) {
      return null;
    }

    const fluid = node?.localFile?.childImageSharp?.thumb ?? null;
    return (
      <div
        role="button"
        aria-label={`image ${index + 1}`}
        tabIndex={0}
        style={{ cursor: "pointer" }}
        onKeyPress={handleKeyPress}
        onClick={handleClick}
      >
        {fluid && <GatsbyImage image={node.localFile.childImageSharp.thumb} alt={`image ${index + 1}`} />}
      </div>
    );
  }
);

export type GallerySizes = "s" | "m" | "l";
export type GalleryImage = {
  localFile: {
    childImageSharp: {
      fullSize: IGatsbyImageData;
      thumb: IGatsbyImageData;
    };
  };
  id: string;
};

type GalleryProps = {
  imageEdges: GalleryImage[];
  setLightbox: (edge: GalleryImage) => void;
  size: GallerySizes;
  className?: string;
};

function Gallery({ imageEdges, setLightbox, size, className }: GalleryProps) {
  const enter = useKeypress("Enter");
  const spacebar = useKeypress("Spacebar");
  const handleKeyPress = useCallback(
    function (edge) {
      if (enter || spacebar) {
        setLightbox(edge);
      }
    },
    [setLightbox, enter, spacebar]
  );

  const handleClick = useCallback(
    function (edge) {
      setLightbox(edge);
    },
    [setLightbox]
  );

  return (
    <div sx={{ variant: `collection.image.${size}` }} className={className}>
      {imageEdges?.map((node, index) => (
        <GalleryImage
          key={node.id + index}
          node={node}
          index={index}
          onKeyPress={handleKeyPress}
          onClick={handleClick}
        />
      ))}
    </div>
  );
}

export default memo(Gallery);
