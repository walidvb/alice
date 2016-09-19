class YearsController < ApplicationController
	before_filter :require_admin!, only: [:create, :new, :update, :destroy]
	skip_before_filter :load_current_year, only: [:create]

	def new
		@new_year = Year.new
	end

	def edit
	end

	def show
    @title = "Home"
    @page_title = "Blog Homepage"
		@posts = Studio.year(@year).map{|s| s.featured_posts.limit(1).order("created_at DESC").first}.compact
		render :home
	end

	def create
		@year = Year.new(permitted_params)
		if @year.save
			respond_to do |format|
				format.html {redirect_to year_users_path(@year), notice: "Year was successfully created."}
				format.json {render json: @year}
			end
		else
			respond_to do |format|
				format.html {render :edit}
				format.json {render json: {errors: @year.errors}, status: :unprocessable_entity}
			end
		end
	end

	def update
		if @year.update!(permitted_params)
			respond_to do |format|
				format.html {redirect_to year_path(@year), notice: "Year was successfully updated."}
				format.json {render json: @year}
			end
		else
			render json: {errors: @year.errors}, status: :unprocessable_entity
		end
	end

	def destroy
		@year.delete
		redirect_to root_path, alert: "You have successfully deleted #{@year.name}"
	end

	def archive
		@year.archive!
		redirect_to edit_year_path(@year), notice: "You have succefully archived #{@year.name}. All existing students are now unabled to access the site."
	end

	private

	def permitted_params
		params.require(:year).permit(:name, :slug, :logo, :link, :display_by_users)
	end
end
