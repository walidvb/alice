class Asset < ActiveRecord::Base
	belongs_to :assetable, polymorphic: true
	has_attached_file :file,
		:styles => {
			:xlarge => "2400>",
			:large => "900>",
			:thumb => "150x90#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	#validates_attachment_content_type :file, :content_type => /\A*\/\.*\Z/
	do_not_validate_attachment_file_type :file
	before_post_process :skip_for_non_images

	validate :file_dimensions
  def skip_for_non_images
    	!/\Aimage\/.*\Z/.match(file_content_type).nil?
  end

  def file_dimensions
	  dimensions = Paperclip::Geometry.from_file(file.queued_for_write[:original].path)
	  #self.width = dimensions.width
	  #self.height = dimensions.height
	  if dimensions.width > 3000 || dimensions.height > 3000
	    errors.add(:file,'Width or height cannot be wider or higher than 3000px')
	  end
	end
end
