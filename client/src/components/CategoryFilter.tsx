import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  minRating: number;
}

interface CategoryFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const categories = ["Electronics", "Fashion", "Home & Kitchen", "Books", "Sports"];
const brands = ["Samsung", "Apple", "Nike", "Adidas", "Sony", "LG"];

export default function CategoryFilter({ filters, onFilterChange }: CategoryFilterProps) {
  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handlePriceChange = (value: number[]) => {
    onFilterChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      priceRange: [0, 100000],
      minRating: 0,
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? 1 : 0);

  return (
    <div className="space-y-6 p-4 bg-card rounded-md border border-card-border">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            data-testid="button-clear-filters"
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-primary hover-elevate"
          >
            Clear All
            <Badge className="ml-2 bg-primary text-primary-foreground" data-testid="text-filter-count">
              {activeFiltersCount}
            </Badge>
          </Button>
        )}
      </div>

      <div>
        <h4 className="font-medium mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={`category-${category}`}
                data-testid={`checkbox-category-${category.toLowerCase()}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm cursor-pointer"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Price Range</h4>
        <div className="space-y-3">
          <Slider
            data-testid="slider-price-range"
            min={0}
            max={100000}
            step={1000}
            value={filters.priceRange}
            onValueChange={handlePriceChange}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span data-testid="text-price-min">₹{filters.priceRange[0].toLocaleString()}</span>
            <span data-testid="text-price-max">₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                data-testid={`checkbox-brand-${brand.toLowerCase()}`}
                checked={filters.brands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <Label
                htmlFor={`brand-${brand}`}
                className="text-sm cursor-pointer"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-medium mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <Button
              key={rating}
              data-testid={`button-rating-${rating}`}
              variant={filters.minRating === rating ? "default" : "outline"}
              size="sm"
              onClick={() => handleRatingChange(rating)}
              className="w-full justify-start"
            >
              {rating}★ & above
            </Button>
          ))}
        </div>
      </div>

      {activeFiltersCount > 0 && (
        <div>
          <h4 className="font-medium mb-3">Applied Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((cat) => (
              <Badge
                key={cat}
                data-testid={`badge-filter-${cat.toLowerCase()}`}
                variant="secondary"
                className="gap-1"
              >
                {cat}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleCategoryToggle(cat)}
                />
              </Badge>
            ))}
            {filters.brands.map((brand) => (
              <Badge
                key={brand}
                data-testid={`badge-filter-${brand.toLowerCase()}`}
                variant="secondary"
                className="gap-1"
              >
                {brand}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleBrandToggle(brand)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
