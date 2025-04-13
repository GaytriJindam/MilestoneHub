import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaretDownIcon, MagnifyingGlassIcon, MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, searchProjects } from "@/redux/Project/Project.Action";
import { useLocation, useNavigate } from "react-router-dom";
import { tags } from "./filterData";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FilterSheet from "./FilterSheet";
import { RocketIcon } from "@radix-ui/react-icons";

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const [keyword, setKeyword] = useState("");

  const { project, auth } = useSelector((store) => store);

  useEffect(() => {
    dispatch(fetchProjects({ category, tag }));
  }, [category, tag, auth.jwt]);

  const handleFilterChange = (section, value) => {
    if (value === "all") {
      searchParams.delete(section);
    } else {
      searchParams.set(section, value);
    }
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  const handleSearchChange = (e) => {
    setKeyword(e.target.value);
    if (e.target.value) {
      dispatch(searchProjects(e.target.value));
    } else {
      // Clear search results when input is empty
      dispatch(fetchProjects({ category, tag }));
    }
  };

  const filteredProjects = keyword ? project.searchProjects : project.projects;
  const isEmptySearch = keyword && project.searchProjects.length === 0;

  return (
    <div className="relative px-4 lg:px-8 py-6 min-h-screen bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-gray-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full filter blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100/20 rounded-full filter blur-3xl translate-x-1/4 translate-y-1/4"></div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Mobile Filter Button */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              className="pl-10 pr-4 py-2 rounded-full bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/50"
              placeholder="Search projects..."
              value={keyword}
              onChange={handleSearchChange}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="ml-2 bg-white shadow-sm">
                <MixerHorizontalIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <FilterSheet />
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <Card className="shadow-lg border-0 rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
                <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                  <MixerHorizontalIcon className="h-5 w-5" />
                </Button>
              </div>

              <ScrollArea className="h-[calc(100vh-200px)] pr-3">
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                      Category
                    </h3>
                    <RadioGroup
                      onValueChange={(value) => handleFilterChange("category", value)}
                      className="space-y-2"
                      defaultValue={category || "all"}
                    >
                      {["all", "fullstack", "frontend", "backend"].map((cat) => (
                        <div key={cat} className="flex items-center space-x-3">
                          <RadioGroupItem value={cat} id={`cat-${cat}`} />
                          <Label htmlFor={`cat-${cat}`} className="capitalize text-gray-700 cursor-pointer">
                            {cat.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-200">
                      Tags
                    </h3>
                    <RadioGroup
                      onValueChange={(value) => handleFilterChange("tag", value)}
                      className="space-y-2"
                      defaultValue={tag || "all"}
                    >
                      {tags.map((tagItem) => (
                        <div key={tagItem} className="flex items-center space-x-3">
                          <RadioGroupItem value={tagItem} id={`tag-${tagItem}`} />
                          <Label htmlFor={`tag-${tagItem}`} className="capitalize text-gray-700 cursor-pointer">
                            {tagItem}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1">
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="relative w-full max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                className="pl-10 pr-4 py-2 text-black rounded-full bg-white shadow-sm border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/50"
                placeholder="Search projects..."
                value={keyword}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            {isEmptySearch ? (
              <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100">
                <div className="text-center space-y-4 max-w-md">
                  <RocketIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-700">No projects found</h3>
                  <p className="text-gray-500">
                    We couldn't find any projects matching <span className="font-medium text-gray-700">"{keyword}"</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Try adjusting your search or filter to find what you're looking for
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => setKeyword("")}
                  >
                    Clear search
                  </Button>
                </div>
              </div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((item) => (
                <ProjectCard 
                  item={item} 
                  key={item.id} 
                  className="transition-all hover:scale-[1.01] hover:shadow-md bg-white/80 backdrop-blur-sm"
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100">
                <div className="text-center space-y-4">
                  <RocketIcon className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="text-xl font-medium text-gray-700">No projects yet</h3>
                  <p className="text-gray-500">
                    Get started by creating your first project
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectList;