import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Image, Loader2, Save, Upload } from "lucide-react";
import { useState } from "react";
import { Control, ControllerRenderProps } from "react-hook-form";

interface MediaFieldProps {
  field: ControllerRenderProps<any, string>;
  label?: string;
}

export const MediaField = ({ field, label = "Media" }: MediaFieldProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaSearchOpen, setMediaSearchOpen] = useState(false);

  const { data: mediaItems, isLoading: isMediaLoading } = useQuery<any[]>({
    queryKey: ["/api/admin/media"],
  });

  const uploadMediaMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to upload media");
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Media uploaded",
        description: "Your file has been uploaded successfully.",
      });
      field.onChange(data.url);
      setSelectedFile(null);
      queryClient.invalidateQueries({
        queryKey: ["/api/admin/media"],
        exact: false,
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      uploadMediaMutation.mutate(selectedFile);
    }
  };

  const selectMedia = (url: string) => {
    field.onChange(url);
    setMediaSearchOpen(false);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="mb-2">
        {field.value ? (
          <div className="relative">
            <img
              src={`/api/media/${field.value}`}
              alt={label}
              className="w-full h-48 object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => field.onChange("")}
            >
              Remove
            </Button>
          </div>
        ) : (
          <div className="w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <Image className="h-12 w-12 text-gray-400" />
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setMediaSearchOpen(!mediaSearchOpen)}
          >
            <Image className="h-4 w-4 mr-2" />
            Media Library
          </Button>

          <div className="relative">
            <input
              type="file"
              id="featured-image"
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
              onChange={handleFileChange}
              accept="image/*"
            />
            <Button type="button" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>

          {selectedFile && (
            <Button
              type="button"
              onClick={handleFileUpload}
              disabled={uploadMediaMutation.isPending}
            >
              {uploadMediaMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save File
            </Button>
          )}
        </div>

        {selectedFile && (
          <p className="text-sm text-gray-500">Selected: {selectedFile.name}</p>
        )}
      </div>

      {/* Media library */}
      {mediaSearchOpen && (
        <div className="mt-4 border p-4 rounded-md max-h-96 overflow-auto">
          <h4 className="font-medium mb-2">Media Library</h4>

          {isMediaLoading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : mediaItems?.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              No media items found
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {mediaItems?.map((item: any) => (
                <div
                  key={item.id}
                  className="cursor-pointer border rounded-md overflow-hidden hover:border-primary"
                  onClick={() => selectMedia(item.url)}
                >
                  <img
                    src={item.url}
                    alt={item.originalFilename}
                    className="w-full h-20 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <FormControl>
        <input type="hidden" {...field} value={field.value || ""} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
