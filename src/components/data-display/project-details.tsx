import Image from "next/image";
import { ExternalLink } from "lucide-react";

import { ProjectDetails as ProjectDetailsType } from "@/lib/types";
import { mergeClasses } from "@/lib/utils";
import Typography from "@/components/general/typography";
import Link from "@/components/navigation/link";
import Tag from "@/components/data-display/tag";
import Card from "@/components/layout/card";

type ProjectDetailsProps = ProjectDetailsType & {
  layoutType: "default" | "reverse";
};

const ProjectDetails = ({
  name,
  description,
  technologies,
  url,
  keyFeatures,
  layoutType = "default",
}: ProjectDetailsProps) => {
  return (
    <Card className="mx-auto flex w-full max-w-4xl flex-col md:flex-row">
      {/* Image */}
      {/* <div
        className={mergeClasses(
          "flex items-center justify-center border-gray-100 bg-gray-50 p-8 dark:bg-gray-200 max-md:rounded-t-xl md:w-1/2 lg:p-12",
          layoutType === "default"
            ? "md:rounded-l-xl md:border-r"
            : "md:order-last md:rounded-r-xl md:border-l"
        )}
      >
        <Image
          src={previewImage}
          alt={`${name} preview`}
          className="rounded-xl shadow-lg transition-transform duration-500 md:hover:scale-105"
          style={{ objectFit: "cover" }}
        />
      </div> */}

      {/* Content */}
      <div
        className={mergeClasses(
          "flex flex-col gap-6 p-8 lg:p-12",
          layoutType === "default" ? "" : "md:order-first"
        )}
      >
        <Typography variant="subtitle" className="font-semibold text-gray-900">
          {name}
        </Typography>
        <Typography>{description}</Typography>
        {keyFeatures && <Typography>Key Features: </Typography>}
        <ul className="ms-8 flex list-disc flex-col gap-2">
          {keyFeatures?.map((feature, index) => (
            <Typography component="li" key={index}>
              {feature}
            </Typography>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((technology, index) => (
            <Tag key={index} label={technology} />
          ))}
        </div>
        {url && (
          <Link
            href={url}
            noCustomization
            className="self-start rounded-lg p-1.5 hover:bg-gray-50 [&_svg]:stroke-gray-500"
            externalLink
          >
            <ExternalLink />
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ProjectDetails;
